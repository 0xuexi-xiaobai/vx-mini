import { Card, Button, Upload, Input, message, List, Avatar, Skeleton } from 'antd';
import { getCategory } from '../../api/category';
import React, { useEffect, useState } from 'react';

const fakeList = [
  { "id": 11, "name": "category1", "description": "This is category 1" }, { "id": 12, "name": "category1", "description": "This is category 1" },
];

const ProductUpdate = () => {

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(fakeList);


  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCategory();
        if (response.code === 200) {
          setList(response.data);
        } else {
          console.error(`Error getting category list: ${response.msg}`);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="app-container">
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={list}
        loading={loading}
        renderItem={(item) => (
          <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>]}
          >
            <List.Item.Meta
              title={item.name}
              description={item.description || 'No description available'} // Add a fallback in case the description is missing
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProductUpdate;