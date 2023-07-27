/* eslint-disable react/require-default-props */
import {
  Modal, Form, Input, InputNumber, Select, Card, Upload, message,
} from 'antd';
import { MessageAdd1, DirectInbox } from 'iconsax-react';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Paragraph from '../commons/Paragraph';
import ImageComponent from '../commons/Image';
import Box from '../commons/Box';
import { AuthContext } from '../context/AuthContext';
import uploadToCloudinary from '../../helpers/uploadToCloudinary';
import { IPetType, IPost } from '../../interfaces';

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

const AddAdoptionModal = ({
  visible, onClose, post, type = 'Add', likesCount, commentsCounts,
}: Props) => {
  const [componentSize, setComponentSize] = useState<SizeType>(() => 'middle');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [types, setTypes] = useState<IPetType[]>([]);

  const { userData } = useContext(AuthContext);
  const [form] = Form.useForm();

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(() => size);
  };

  const getTypes = async () => {
    try {
      const { data: { data } } = await axios.get('/api/v1/types/');
      setTypes(data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status !== 401) {
        message.error('Something went wrong!');
      }
    }
  };
  useEffect(() => { getTypes(); }, []);
  const normFile = (e: { fileList: unknown; }) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const addAdoptionPost = async () => {
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
        categoryId: 1,
        petName: form.getFieldValue('petName'),
        type: form.getFieldValue('type'),
        age: form.getFieldValue('age'),
        gender: form.getFieldValue('gender'),
        healthStatus: form.getFieldValue('healthStatus'),
        adoptionStatus: form.getFieldValue('adoptionStatus'),
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
  const editAdoptionPost = async (postId:number) => {
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
        categoryId: 1,
        petName: form.getFieldValue('petName'),
        type: form.getFieldValue('type'),
        age: form.getFieldValue('age'),
        gender: form.getFieldValue('gender'),
        healthStatus: form.getFieldValue('healthStatus'),
        adoptionStatus: form.getFieldValue('adoptionStatus'),
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
        await addAdoptionPost();
      } else if (type === 'Edit') {
        await editAdoptionPost(post !== undefined ? post?.postId : 0);
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
        type: post?.pets?.[0]?.petType?.typeId || '',
        age: post?.pets?.[0]?.age || '',
        gender: post?.pets?.[0]?.gender || '',
        healthStatus: post?.pets?.[0]?.healthStatus || '',
        adoptionStatus: post?.pets?.[0]?.adoptionStatus || '',
      });
    }
  }, [visible, post]);

  return (
    <Modal
      title={`${type} Adoption Post`}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={`${type} Post`}
      width={650}
      style={{ top: 20 }}
      confirmLoading={confirmLoading}
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
        style={{ maxWidth: 600, display: 'flex', flexDirection: 'column' }}
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
                defaultValue={post !== undefined ? post.postContent : ''}
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
          <Box className="addPost--petInformationTitle">Pet Information</Box>
          <Form.Item
            label="Pet Name"
            name="petName"
            rules={[{ required: true, message: "Pet name can't be empty" }]}
            messageVariables={{ label: 'Pet Name' }}
          >
            <Input defaultValue={post !== undefined ? post.pets[0].petName : ''} />
          </Form.Item>
          <Form.Item
            label="Pet Type"
            name="type"
            rules={[{ required: true, message: "Pet type can't be empty" }]}
            messageVariables={{ label: 'Pet type' }}
          >
            <Select defaultValue={post !== undefined ? post.pets[0].petType.typeId : ''}>
              {
              types.map((petType:IPetType) => (
                <Select.Option
                  key={petType.typeId}
                  value={petType.typeId}
                >
                  {petType.title}
                </Select.Option>
              ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="Pet gender"
            name="gender"
            rules={[{ required: true, message: "Pet gender can't be empty" }]}
            messageVariables={{ label: 'Pet gender' }}
          >
            <Select defaultValue={post !== undefined ? post.pets[0].gender : ''}>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "age can't be empty" }]}
            messageVariables={{ label: 'Age' }}
          >
            <InputNumber defaultValue={post !== undefined ? post.pets[0].age : ''} />
          </Form.Item>
          <Form.Item
            label="Health Status"
            name="healthStatus"
            rules={[{ required: true, message: "Health Status can't be empty" }]}
            messageVariables={{ label: 'Health Status' }}
          >
            <Input defaultValue={post !== undefined ? post.pets[0].healthStatus : ''} />
          </Form.Item>

          <Form.Item
            label="Adoption Status"
            name="adoptionStatus"
            rules={[{ required: true, message: "Adoption Status can't be empty" }]}
            messageVariables={{ label: 'Adoption Status' }}
          >
            <Select defaultValue={post !== undefined ? post.pets[0].adoptionStatus : ''}>
              <Select.Option value="Available">Available</Select.Option>
              <Select.Option value="Adopted">Adopted</Select.Option>
            </Select>
          </Form.Item>
        </Card>
      </Form>
    </Modal>
  );
};

export default AddAdoptionModal;
