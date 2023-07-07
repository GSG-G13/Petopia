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

const AddNewPost: React.FC = () => {
  const [normalPostModal, setNormalPostModal] = useState(false);
  const [adoptionModal, setAdoptionModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const { userData } = useContext(AuthContext);
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
      {normalPostModal ? <NormalPostModal visible={normalPostModal} onClose={hideNormalPostModal} /> : null}
      {adoptionModal ? <AddAdoptionModal visible={adoptionModal} onClose={hideAdoptionModal} /> : null}
      {productModal ? <AddProductModal visible={productModal} onClose={hideProductModal} /> : null}
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

        <Space direction="horizontal" size={16}>
          <Button
            type="text"
            size="large"
            className="addPost--discussButton addPost--postButtons"
            onClick={showNormalPostModal}
          >
            Normal Post
          </Button>
          <Button
            type="text"
            size="large"
            className="addPost--adoptionButton addPost--postButtons"
            onClick={showAdoptionModal}
          >
            Adoption
          </Button>
          <Button
            type="text"
            size="large"
            className="addPost--productButton addPost--postButtons"
            onClick={showProductModal}
          >
            Product
          </Button>
          <Button type="text" size="large" className="addPost--helpButton addPost--postButtons">
            Help
          </Button>
        </Space>
      </Card>
    </Space>
  );
};

export default AddNewPost;
