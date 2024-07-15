import { Card, Button, Upload, Input, message, List, Avatar, Skeleton } from 'antd';
import { uploadPrompt } from '../../api/prompt';
import React, { useEffect, useState } from 'react';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [textValue, setTextValue] = useState('');
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);
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
  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

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
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name?.last}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>

  );
};

export default ImageUploader;