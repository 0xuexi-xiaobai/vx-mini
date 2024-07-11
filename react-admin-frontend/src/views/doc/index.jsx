import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from 'antd';
import { updateBanner, getBanner } from '../../api/banner';

const defaultTitle = '默认文档标题';

const Doc = () => {
  const [title, setTitle] = useState(defaultTitle);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedTitle = await getBanner();
      setTitle(fetchedTitle || defaultTitle);
    } catch (error) {
      console.error('Error fetching document title:', error);
      setTitle(defaultTitle);
    }
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUpdateClick = async () => {
    try {
      await updateBanner(title);
      console.log('Document title updated successfully:', title);
      fetchData();
    } catch (error) {
      console.error('Error updating document title:', error);
    }
  };

  return (
    <div className="app-container">
      <Card title="编辑标题" style={{ width: 400 }}>
        <Input
          placeholder="文档标题"
          value={title}
          onChange={handleInputChange}
        />
        <Button type="primary" style={{ marginTop: '10px' }} onClick={handleUpdateClick}>
          更新文档标题
        </Button>
      </Card>
    </div>
  );
};

export default Doc;