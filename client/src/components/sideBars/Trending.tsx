import {
  Row, Col, Typography, message, Empty, Tooltip,
} from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ImageComponent from '../commons/Image';
import { IPost } from '../../interfaces';

const { Title } = Typography;

const Trending = () => {
  const [products, setProducts] = useState<IPost[]>([]);
  const fetchProducts = async () => {
    try {
      const { data: { data } } = await axios.get('/api/v1/posts/');
      setProducts(() => data);
      setProducts((prev) => prev.filter((product) => (product.isHaveImg && product.categoryId === 4)));
    } catch (err) {
      message.error('something went wrong');
    }
  };
  useEffect(() => { fetchProducts(); }, []);

  return (
    <Row justify="center">
      <Col span={24}>
        <Title level={4} style={{ marginTop: 40, marginBottom: 16 }}>Trending Products</Title>
        <Row
          gutter={{
            xs: 8, sm: 16, md: 24, lg: 32,
          }}
          style={{ marginBottom: 16 }}
        >
          {products.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="There are currently no trending products"
              style={{ display: 'flex', transitionDelay: 'display 5s', justifyContent: 'center' }}
            />
          ) : (
            <Row gutter={[15, 15]}>
              {products.slice(0, 4).map((product) => (
                <Col span={12} style={{ padding: '15px 0 0 15px' }} key={product.postId}>
                  <Link to={`/post/${product.postId}`}>
                    <Tooltip placement="bottom" title={`posted by ${product.user.fullName}`}>
                      <ImageComponent
                        width="130px"
                        height="100px"
                        className="product-img"
                        src={product.postImages ? product.postImages[0].imageUrl : ''}
                        alt="product"
                      />
                    </Tooltip>
                  </Link>
                </Col>
              ))}
            </Row>
          )}
        </Row>
      </Col>
    </Row>
  );
};
export default Trending;
