import React, { useState, useEffect } from 'react';
import { Input, Button, Card, Row, Col } from 'antd';
import { updateSwiper, getSwipers } from '../../api/swiper';

const defaultSwipers = [
  {
    name: '默认名称',
    image: '默认图片链接',
    description: '(如果显示默认名称，',
    link: '检查服务器连接)',
  },
  {
    name: '默认名称2',
    image: '默认图片链接2',
    description: '默认文字介绍2',
    link: '默认链接2',
  },
  {
    name: '默认名称3',
    image: '默认图片链接3',
    description: '默认文字介绍3',
    link: '默认链接3',
  },
];

const SwipersPage = () => {
  const [swipers, setSwipers] = useState(defaultSwipers);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getSwipers();
      setSwipers(data && data.length > 0 ? data : defaultSwipers);
    } catch (error) {
      console.error('Error fetching swipers:', error);
      setSwipers(defaultSwipers);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedSwipers = [...swipers];
    updatedSwipers[index][field] = value;
    setSwipers(updatedSwipers);
  };

  const handleUpdateClick = async (index) => {
    const updatedSwiper = swipers[index];
    try {
      await updateSwiper(updatedSwiper);
      console.log('Swiper updated successfully:', updatedSwiper);
      fetchData();
    } catch (error) {
      console.error('Error updating swiper:', error);
    }
  };

  const fieldLabels = {
    name: '名称',
    image: '图片链接',
    description: '文字介绍',
    link: '链接',
  };

  return (
    <div className="app-container">
      {swipers.map((swiper, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <Card title={`Swiper ${index + 1}`} style={{ width: 400 }}>
            <Row gutter={16}>
              <Col span={12}>
                <div>{fieldLabels.name}</div>
                <Input
                  placeholder="名称"
                  value={swiper.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                />
              </Col>
              <Col span={12}>
                <div>{fieldLabels.image}</div>
                <Input
                  placeholder="图片链接"
                  value={swiper.image}
                  onChange={(e) => handleInputChange(index, 'image', e.target.value)}
                />
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: '10px' }}>
              <Col span={12}>
                <div>{fieldLabels.description}</div>
                <Input
                  placeholder="文字介绍"
                  value={swiper.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                />
              </Col>
              <Col span={12}>
                <div>{fieldLabels.link}</div>
                <Input
                  placeholder="链接"
                  value={swiper.link}
                  onChange={(e) => handleInputChange(index, 'link', e.target.value)}
                />
              </Col>
            </Row>
            <Button type="primary" style={{ marginTop: '10px' }} onClick={() => handleUpdateClick(index)}>
              更新swiper {index + 1}
            </Button>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SwipersPage;
