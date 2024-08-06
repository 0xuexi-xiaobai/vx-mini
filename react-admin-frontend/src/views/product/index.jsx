import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Spin, Alert, Button } from 'antd';
import { getProduct } from '../../api/product';

const { Meta } = Card;

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getProduct();
      if (response.status === 200 && Array.isArray(response.data.data)) {
        setCategories(response.data.data);
        if (response.data.length > 0) {
          setSelectedCategoryId(response.data[0].id);
        }
      } else {
        throw new Error('Invalid data format');
      }
      setLoading(false);
    } catch (error) {
      setError(error.message || 'Error fetching product data');
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  const selectedCategory = categories.find(
    category => category.id === selectedCategoryId
  );

  return (
    <div className="app-container">
      <div style={{ marginBottom: '20px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {categories.map(category => (
          <Button
            key={category.id}
            type={selectedCategoryId === category.id ? 'primary' : 'default'}
            onClick={() => setSelectedCategoryId(category.id)}
            style={{
              margin: '0 5px',
              borderRadius: '20px',
              padding: '10px 20px',
              textAlign: 'center',
              lineHeight: 'normal', // Ensures text aligns vertically if there's any height discrepancy
            }}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {selectedCategory && (
        <div>
          <h2>{selectedCategory.name}</h2>
          <p>{selectedCategory.description}</p>
          <Row gutter={16}>
            {selectedCategory.productList.length === 0 ? (
              <p>No products available in this category.</p>
            ) : (
              selectedCategory.productList.map(product => (
                <Col span={6} key={product.id}>
                  <Card
                    hoverable
                    cover={<img alt={product.name} src={product.imgUrl} />}
                    style={{ marginBottom: '16px' }}
                  >
                    <Meta
                      title={product.name}
                      description={
                        product.description
                      }
                    />
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
