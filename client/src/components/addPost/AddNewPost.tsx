import React, { useState } from 'react';
import {
  Space, Card, Button, Input,
} from 'antd';
import { MessageAdd1 } from 'iconsax-react';
import ImageComponent from '../commons/Image';
import Box from '../commons/Box';
import NormalPostModal from './NormalPostModal';
import AddAdoptionModal from './AddAdoptionModal';
import AddProductModal from './AddProductModal';

import './addPost.css';

const AddNewPost: React.FC = () => {
  const [normalPostModal, setNormalPostModal] = useState(false);
  const [adoptionModal, setAdoptionModal] = useState(false);
  const [productModal, setProductModal] = useState(false);

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

  return (
    <Space direction="vertical" size={16}>
      <NormalPostModal visible={normalPostModal} onClose={hideNormalPostModal} />
      <AddAdoptionModal visible={adoptionModal} onClose={hideAdoptionModal} />
      <AddProductModal visible={productModal} onClose={hideProductModal} />
      <div className="addPost--welcome">Welcome back, Mohammed!</div>
      <Card className="addPost--card">
        <Box className="addPost">
          <ImageComponent
            src="https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg"
            alt="image"
            className="addPost--user-img"
            width="40px"
            height="40px"
          />
          <Input type="text" id="hi" className="addPost--post-field" placeholder="What's in your mind, Mohammed?" />
          <MessageAdd1 className="add" />
        </Box>
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
