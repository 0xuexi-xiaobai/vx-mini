import React, { useState } from 'react';
import { Card, Button, Upload, Input, message } from 'antd';
import { uploadPrompt } from '../../api/prompt';

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [textValue, setTextValue] = useState('');

  const handleImageChange = (info) => {
    const { status } = info.file;
    if (status === 'done') {
      getBase64(info.file.originFileObj).then((url) => {
        setImageUrl(url);
        message.success('图片上传成功');
      });
    } else if (status === 'error') {
      message.error('图片上传失败');
    }
  };

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUploadClick = async () => {
    if (!imageUrl && !textValue) {
      message.warning('请先选择图片或输入文字');
      return;
    }

    const formData = new FormData();
    if (imageUrl) {
      formData.append('file', dataURLtoFile(imageUrl, 'image.png'));
    }
    if (textValue) {
      formData.append('text', textValue);
    }

    try {
      await uploadPrompt(formData);
      message.success('数据已上传到服务器');
    } catch (error) {
      console.error('Error uploading data:', error);
      message.error('上传数据到服务器失败');
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const uploadButton = (
    <div>
      <div className="ant-upload-text">点击上传图片</div>
    </div>
  );

  return (
    <div className="app-container">
      <Card title="上传图片和文字" style={{ width: 400 }}>
        <div>
          上传图片
        </div>
        <Upload
          listType="picture-card"
          showUploadList={true}
          beforeUpload={() => false}
          onChange={handleImageChange}
          accept=".png, .jpg, .jpeg, .gif, .bmp, .svg" // Add supported image types
        >
          {imageUrl ? <img src={imageUrl} alt="preview" /> : uploadButton}
        </Upload>
        <div>输入prompt示例</div>
        <Input.TextArea
          rows={4}
          placeholder="输入prompt示例"
          value={textValue}
          onChange={handleTextChange}
          style={{ marginTop: '10px' }}
        />
        <Button type="primary" style={{ marginTop: '10px' }} onClick={handleUploadClick}>
          上传到服务器
        </Button>
      </Card>
    </div>
  );
};

export default ImageUploader;