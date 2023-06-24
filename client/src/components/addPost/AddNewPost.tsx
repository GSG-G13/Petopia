import {  Space, Card , Button} from 'antd';
import React, { useState } from 'react';
import NormalPostModal from './NormalPostModal';
import AddAdoptionModal from './AddAdoptionModal';
import AddProductModal from './AddProductModal';
import { MessageAdd1 } from 'iconsax-react';

import './addPost.css'

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
    <>
    <Space direction="vertical" size={16}>


      <NormalPostModal visible={normalPostModal} onClose={hideNormalPostModal} />
      <AddAdoptionModal visible={adoptionModal} onClose={hideAdoptionModal} />
      <AddProductModal visible={productModal} onClose={hideProductModal} />
      <div className='welcome'>Welcome back, Mohammed!</div>
<Card className='card'>
<div className='addPost'>
        <img src="https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg" alt="image" className='user-img' />
        <input type="text" id='hi' className='post-field' placeholder="What's in your mind, Mohammed?" />
        <MessageAdd1 className='add'/>
</div>  
      <Space direction="horizontal" size={16}>

        <Button type="text" size={'large'} className='discussButton postButtons' onClick={showNormalPostModal}>Normal Post</Button>
        <Button type="text" size={'large'} className='adoptionButton postButtons' onClick={showAdoptionModal}>Adoption</Button>
        <Button type="text" size={'large'} className='productButton postButtons' onClick={showProductModal}>Product</Button>
        <Button type="text" size={'large'} className='helpButton postButtons'>Help</Button>
        
      </Space>
      </Card>
      </Space>
    </>
  );
};

export default AddNewPost;
