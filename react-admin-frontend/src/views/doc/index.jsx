import React, { useState, useEffect } from 'react';
import { Input, Button, notification } from 'antd';
import TypingCard from '@/components/TypingCard';
import { updateBanner, getBanner } from '../../api/banner';

const Doc = () => {
  const [bannerValue, setBannerValue] = useState('');
  const [bannerTitle, setBannerTitle] = useState('');

  useEffect(() => {
    fetchBannerTitle();
  }, []);

  const fetchBannerTitle = async () => {
    let title;
    try {
      title = await getBanner();
    } catch (error) {
      console.error('Error fetching banner title:', error);
    }
    setBannerTitle(title || "no banner api");
  };

  const handleInputChange = (e) => {
    setBannerValue(e.target.value);
  };

  const handleButtonClick = () => {
    // 发送请求
    updateBanner(bannerValue)
      .then(response => {
        console.log('Response:', response);
        notification.success({
          message: '请求成功',
          description: '你的请求已成功发送。',
        });
        // 更新成功后，重新获取banner标题
        fetchBannerTitle();
      })
      .catch(error => {
        console.error('Error:', error);
        notification.error({
          message: '请求失败',
          description: '发送请求时出现错误，请稍后再试。',
        });
      });
  };

  return (
    <div className="app-container">
      <TypingCard title="小程序banner" source={bannerTitle} />
      <Input
        size="large"
        placeholder="输入新的banner"
        value={bannerValue}
        onChange={handleInputChange}
      />
      <Button type="primary" onClick={handleButtonClick}>
        更新banner
      </Button>
    </div>
  );
};

export default Doc;
