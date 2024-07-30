import { Card, Button, Upload, Input, message, List, Avatar, Skeleton, Modal } from 'antd';
import { getCategory, updateCategory } from '../../api/category';
import React, { useEffect, useState } from 'react';

const { Meta } = List.Item;
const { TextArea } = Input;
// 假设这是你的分类列表数据
const fakeList = [
  { "id": 11, "name": "category1", "description": "This is category 1" },
  { "id": 12, "name": "category1", "description": "This is category 1" },
];

const ProductUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCategory();
        if (response.code === 200) {
          setList(response.data);
        } else {
          message.error(`Error getting category list: ${response.msg}`);
        }
      } catch (error) {
        message.error('An error occurred fetching the category list.');
      }
      setLoading(false);
    };
    // fetchData();
  }, []);

  const showModal = (category) => {
    setSelectedCategory(category);
    setNewName(category.name);
    setNewDescription(category.description);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    try {
      const response = await updateCategory(selectedCategory.id, { name: newName, description: newDescription });
      if (response.code === 200) {
        message.success('Category updated successfully.');
        setIsModalVisible(false);
        // Refresh the list after successful update
        const fetchData = async () => {
          const response = await getCategory();
          if (response.code === 200) {
            setList(response.data);
          }
        };
        fetchData();
      } else {
        message.error(`Error updating category: ${response.msg}`);
      }
    } catch (error) {
      message.error('An error occurred while updating the category.');
    }
  };

  return (
    <div className="app-container">
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        loading={loading}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit" onClick={() => showModal(item)}>edit</a>,
              <a key="list-loadmore-more">more</a>
            ]}
          >
            <Meta
              title={item.name}
              description={item.description || 'No description available'}
            />
          </List.Item>
        )}
      />
      <Modal
        title="Edit Category"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <label htmlFor="name">Name:</label>
          <Input
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <TextArea
            id="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows={4}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProductUpdate;