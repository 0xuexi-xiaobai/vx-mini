import React, { useState, useEffect } from 'react';
import { Input, Button, Card, Row, Col, Form } from 'antd';
import { updateSwiper, getSwipers } from '../../api/swiper';

const { TextArea } = Input;

const defaultSwipers = [
  {
    id: 1,
    name: '默认名称',
    image: '默认图片链接', // Replace with base64 string for testing
    description: '(如果显示默认名称，检查服务器连接)',
    link: '默认链接1',
  },
  {
    id: 2,
    name: '默认名称2',
    image: '默认图片链接2', // Replace with base64 string for testing
    description: '默认文字介绍2',
    link: '默认链接2',
  },
  {
    id: 3,
    name: '默认名称3',
    image: '默认图片链接3', // Replace with base64 string for testing
    description: '默认文字介绍3',
    link: '默认链接3',
  },
];

const SwipersPage = () => {
  const [swipers, setSwipers] = useState(defaultSwipers);
  const [originalSwipers, setOriginalSwipers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getSwipers();
      const data = res.data;
      console.log('swiper data', data);
      setSwipers(data && data.length > 0 ? data : defaultSwipers);
      setOriginalSwipers(JSON.parse(JSON.stringify(data && data.length > 0 ? data : defaultSwipers))); // Store original data deeply copied
    } catch (error) {
      console.error('Error fetching swipers:', error);
      setSwipers(defaultSwipers);
      setOriginalSwipers(JSON.parse(JSON.stringify(defaultSwipers))); // Store original data deeply copied
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedSwipers = [...swipers];
    updatedSwipers[index][field] = value;
    setSwipers(updatedSwipers);
  };

  const handleUpdateClick = async (index) => {
    const updatedSwiper = swipers[index];
    const originalSwiper = originalSwipers[index];

    // Check if there are changes
    const hasChanges = Object.keys(updatedSwiper).some(
      (key) => updatedSwiper[key] !== originalSwiper[key]
    );

    if (hasChanges) {
      try {
        await updateSwiper(updatedSwiper);
        console.log('Swiper updated successfully:', updatedSwiper);
        fetchData();
      } catch (error) {
        console.error('Error updating swiper:', error);
      }
    } else {
      console.log('No changes detected, update skipped.');
    }

    setEditingIndex(null);
  };

  return (
    <div className="app-container">
      {swipers.map((swiper, index) => (
        <div key={swiper.id} style={{ marginBottom: '20px' }}>
          <Card
            title={swiper.name}
            style={{ width: 400 }}
            extra={
              editingIndex === index ? (
                <Button type="primary" onClick={() => handleUpdateClick(index)}>
                  保存
                </Button>
              ) : (
                <Button type="primary" onClick={() => setEditingIndex(index)}>
                  编辑
                </Button>
              )
            }
          >
            {editingIndex === index ? (
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="名称">
                      <Input
                        value={swiper.name}
                        onChange={(e) =>
                          handleInputChange(index, 'name', e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="图片链接">
                      <Input
                        value={swiper.image}
                        onChange={(e) =>
                          handleInputChange(index, 'image', e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: '10px' }}>
                  <Col span={24}>
                    <Form.Item label="文字介绍">
                      <TextArea
                        rows={6}
                        value={swiper.description}
                        onChange={(e) =>
                          handleInputChange(index, 'description', e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="链接">
                      <TextArea
                        rows={4}
                        value={swiper.link}
                        onChange={(e) =>
                          handleInputChange(index, 'link', e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            ) : (
              <div>
                <p>名称：{swiper.name}</p>
                <p>图片链接：<img src={swiper.imgUrl} alt={swiper.name} style={{ maxWidth: '100%' }} /></p>
                <p>文字介绍：{swiper.description}</p>
                <p>链接：{swiper.link}</p>
              </div>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SwipersPage;
