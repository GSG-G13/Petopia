import {
  Modal, Form, Input, InputNumber, Card, Upload,
} from 'antd';
import { useState } from 'react';
import { MessageAdd1, DirectInbox } from 'iconsax-react';
import Paragraph from '../commons/Paragraph';
import ImageComponent from '../commons/Image';
import Box from '../commons/Box';

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

type SizeType = Parameters<typeof Form>[0]['size'];

const AddProductModal = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
  const [componentSize, setComponentSize] = useState<SizeType>(() => 'middle');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(() => size);
  };

  const handleOk = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title="Add Your Product Post"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Add Post"
      width={650}
      style={{ top: 20 }}
      className="addPostModal"
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{ width: '100%' }}
      >
        <Card className="modalCard">
          <Box className="addPost">
            <ImageComponent
              src="https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg"
              alt="image"
              className="user-img"
              width="40px"
              height="40px"
            />
            <TextArea
              className="post-field"
              style={{ height: 90, width: 490 }}
              placeholder="What's in your mind, Mohammed?"
            />
            <MessageAdd1 className="add" />
          </Box>

          <Form.Item className="uploadField">
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger name="files" action="/upload.do" listType="picture" multiple>
                <Paragraph className="ant-upload-drag-icon">
                  <DirectInbox />
                </Paragraph>
                <Paragraph>Click or drag Images to this area to upload</Paragraph>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>

          <Box className="petInformationTitle">Product Information</Box>

          <Form.Item label="Title">
            <Input placeholder="Product Title" />
          </Form.Item>

          <Form.Item label="Price">
            <InputNumber />
          </Form.Item>

          <Form.Item label="Details">
            <TextArea style={{ height: 90, width: '100%' }} placeholder="What's in your product details, Mohammed?" />
          </Form.Item>
        </Card>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
