/* eslint-disable react/require-default-props */
import {
  Modal, Form, Input, InputNumber, Card, Upload, message,
} from 'antd';
import { useContext, useEffect, useState } from 'react';
import { MessageAdd1, DirectInbox } from 'iconsax-react';
import axios from 'axios';
import Paragraph from '../commons/Paragraph';
import ImageComponent from '../commons/Image';
import Box from '../commons/Box';
import { AuthContext } from '../context/AuthContext';
import uploadToCloudinary from '../../helpers/uploadToCloudinary';
import { IPost } from '../../interfaces';

const { TextArea } = Input;

type SizeType = Parameters<typeof Form>[0]['size'];
interface Props {
  visible: boolean
  onClose: () => void
  post?:IPost
  type?:string
  likesCount:number
  commentsCounts:number
}
const AddProductModal = ({
  visible, onClose, post, type = 'Add', likesCount, commentsCounts,
}: Props) => {
  const [componentSize, setComponentSize] = useState<SizeType>(() => 'middle');
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(() => size);
  };
  const { userData } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const normFile = (e: { fileList: unknown; }) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const addProductPost = async () => {
    try {
      await form.validateFields();
      const images = form.getFieldValue('images');
      if (images && images.length > 0) {
        const imageUrls = await Promise.all(images.map(uploadToCloudinary));
        form.setFieldsValue({ images: imageUrls });
      }
      await axios.post('/api/v1/posts/', {
        postContent: form.getFieldValue('postContent'),
        isHaveImg: (!!images),
        imagesUrl: form.getFieldValue('images'),
        categoryId: 4,
        title: form.getFieldValue('title'),
        price: form.getFieldValue('price'),
        details: form.getFieldValue('details'),
        rating: 4.9,
      });

      form.resetFields();
      message.success('Post added successfully');
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };
  const editProductPost = async (postId:number) => {
    try {
      await form.validateFields();
      const images = form.getFieldValue('images');
      if (images && images.length > 0) {
        const imageUrls = await Promise.all(images.map(uploadToCloudinary));
        form.setFieldsValue({ images: imageUrls });
      }
      await axios.put(`/api/v1/posts/${postId}`, {
        postContent: form.getFieldValue('postContent'),
        isHaveImg: (!!images),
        imagesUrl: form.getFieldValue('images'),
        categoryId: 4,
        title: form.getFieldValue('title'),
        price: form.getFieldValue('price'),
        details: form.getFieldValue('details'),
        rating: 4.9,
        likesCount: post !== undefined ? likesCount : 0,
        commentsCount: post !== undefined ? commentsCounts : 0,
      });

      form.resetFields();
      message.success('Post edited successfully');
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };
  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      if (type === 'Add') {
        await addProductPost();
      } else if (type === 'Edit') {
        editProductPost(post !== undefined ? post?.postId : 0);
      }
      setConfirmLoading(false);
    } catch (error) {
      message.error('Something went wrong');
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };
  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        postContent: post?.postContent || '',
        isHaveImg: (!!form.getFieldValue('images')),
        imagesUrl: form.getFieldValue('images'),
        petName: post?.pets?.[0]?.petName || '',
        title: post?.products?.[0]?.title || '',
        price: post?.products?.[0]?.price || '',
        details: post?.products?.[0]?.details || '',
        rating: post?.products?.[0]?.rating || '',
      });
    }
  }, [visible, post]);
  return (
    <Modal
      title={`${type} Product Post`}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      okText={`${type} Post`}
      width={650}
      style={{ top: 20 }}
      className="addPost--addPostModal"
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{ width: '100%' }}
      >
        <Card className="addPost--modalCard">
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
              rules={[{ required: true, message: "Post content can't be empty" }]}
              messageVariables={{ label: 'post-content' }}
            >
              <TextArea
                className="addPost--post-field"
                style={{ height: 90, width: 490 }}
                placeholder={`What's in your mind, ${userData.fullName}?`}
              />
            </Form.Item>
            <MessageAdd1 className="add" />
          </Box>

          <Form.Item className="addPost--uploadField">
            <Form.Item name="images" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger
                action=""
                listType="picture"
                multiple
                beforeUpload={() => false}
                onChange={({ fileList }) => {
                  form.setFieldsValue({ images: fileList });
                }}
              >
                <Paragraph className="addPost--ant-upload-drag-icon">
                  <DirectInbox />
                </Paragraph>
                <Paragraph>Click or drag images to this area to upload</Paragraph>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>

          <Box className="addPost--petInformationTitle">Product Information</Box>

          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Product title can't be empty" }]}
            messageVariables={{ label: 'Title' }}
          >
            <Input placeholder="Product Title" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Product price can't be empty" }]}
            messageVariables={{ label: 'Price' }}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Details"
            name="details"
            rules={[{ required: true, message: "Product details can't be empty" }]}
            messageVariables={{ label: 'Details' }}
          >
            <TextArea
              style={{ height: 90, width: '100%' }}
              placeholder={`What's in your product details, ${userData.fullName}?`}
            />
          </Form.Item>
        </Card>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
