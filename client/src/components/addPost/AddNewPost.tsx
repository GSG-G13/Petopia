import React, { useContext, useState } from 'react';
import {
  Space, Card, Button, Input, Form, message,
} from 'antd';
import { MessageAdd1 } from 'iconsax-react';
import axios from 'axios';
import ImageComponent from '../commons/Image';
import Box from '../commons/Box';
import NormalPostModal from './NormalPostModal';
import AddAdoptionModal from './AddAdoptionModal';
import AddProductModal from './AddProductModal';
import './addPost.css';
import { AuthContext } from '../context/AuthContext';
import { ICategory } from '../../interfaces';

const AddNewPost: React.FC = () => {
  const [normalPostModal, setNormalPostModal] = useState(false);
  const [adoptionModal, setAdoptionModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const { userData, categoriesData } = useContext(AuthContext);
  const [category, setCategory] = useState<ICategory>({ title: 'Post', categoryId: 3 });
  const [form] = Form.useForm();
  const showNormalPostModal = () => {
    setNormalPostModal(true);
  };

  const hideNormalPostModal = () => {
    setNormalPostModal(false);
  };

  const showAdoptionModal = () => {
    setAdoptionModal(true);
  };

  const hideAdoptionModal = () => {
    setAdoptionModal(false);
  };

  const showProductModal = () => {
    setProductModal(true);
  };

  const hideProductModal = () => {
    setProductModal(false);
  };
  const getModal = (categoryData:ICategory) => {
    switch (categoryData.title) {
      case 'Post':
        setCategory(() => categoryData);
        return showNormalPostModal;
      case 'Sell':
        return showProductModal;
      case 'Adoption':
        return showAdoptionModal;
      default:
        setCategory(() => categoryData);
        return showNormalPostModal;
    }
  };
  const addNormalPost = async () => {
    try {
      await axios.post(
        '/api/v1/posts/',
        {
          postContent: form.getFieldValue('postContent'), isHaveImg: false, categoryId: 3,
        },
      );
      form.resetFields();
      message.success('Post added successfully');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };

  return (
    <Space direction="vertical" size={16}>
      {normalPostModal ? (
        <NormalPostModal
          visible={normalPostModal}
          onClose={hideNormalPostModal}
          category={category}
          commentsCounts={0}
          likesCount={0}
        />
      ) : null}
      {adoptionModal ? (
        <AddAdoptionModal
          visible={adoptionModal}
          onClose={hideAdoptionModal}
          commentsCounts={0}
          likesCount={0}
        />
      ) : null}
      {productModal ? (
        <AddProductModal
          visible={productModal}
          onClose={hideProductModal}
          commentsCounts={0}
          likesCount={0}
        />
      ) : null}
      <Box className="addPost--welcome">
        Welcome back,
        {' '}
        {userData.fullName}
      </Box>
      <Card className="addPost--card">

        <Form
          form={form}
          name="post-normal"
          onFinish={addNormalPost}
        >
          <Box className="addPost">
            <ImageComponent
              src={userData.userImage}
              alt="image"
              className="addPost--user-img"
              width="40px"
              height="40px"
            />
            <Form.Item
              name="postContent"
              rules={[{ required: true, message: 'post content can\'t be empty' }]}
              messageVariables={{ label: 'postContent' }}
            >
              <Input
                type="text"
                id="hi"
                className="addPost--post-field"
                placeholder={`What's in your mind, ${userData.fullName} ?`}
              />
            </Form.Item>
            <Form.Item className="add" style={{ margin: 0, padding: 0 }}>
              <Button type="link" icon={<MessageAdd1 className="add-icon" />} htmlType="submit" />
            </Form.Item>
          </Box>
        </Form>

        <Box className="add-post-buttons-container">
          {
            categoriesData.map((categoryData) => (
              <Button
                type="text"
                size="large"
                key={categoryData.categoryId}
                className={`addPost--${categoryData.title}Button addPost--postButtons`}
                onClick={() => (getModal(categoryData))()}
              >
                { categoryData.title}
              </Button>
            ))
          }
        </Box>
      </Card>
    </Space>
  );
};

export default AddNewPost;
