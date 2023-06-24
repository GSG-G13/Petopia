import { Modal, Form, Input, Upload, Card } from 'antd';
import { MessageAdd1, DirectInbox } from 'iconsax-react';
import { useState } from 'react';

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
type SizeType = Parameters<typeof Form>[0]['size'];

const NormalPostModal = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
  const [componentSize, setComponentSize] = useState<SizeType>(() => 'middle');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(() => size);
  };

  const handleOk = () => {
    // Add post logic
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title="Add Your Normal Post"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Add Post"
      width={650}
      style={{ top: 20 }}
      className='addPostModal'
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{ maxWidth: 600, display: 'flex', flexDirection: "column" }}
      >
        <Card className='modalCard'>
          <div className='addPost'>
            <img src="https://cdn.discordapp.com/attachments/1113720733860888597/1121405281147027526/IMG_20201207_144829.jpg" alt="image" className='user-img' />
            <TextArea className='post-field' style={{ height: 90, width: 490 }} placeholder="What's in your mind, Mohammed?" />
            <MessageAdd1 className='add' />
          </div>

          <Form.Item className='uploadField'>
  <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
    <Upload.Dragger name="files" action="/upload.do" listType="picture" multiple={true}>
      <p className="ant-upload-drag-icon">
        <DirectInbox />
      </p>
      <p>Click or drag Images to this area to upload</p>
    </Upload.Dragger>
  </Form.Item>
</Form.Item>
        </Card>
      </Form>
    </Modal>
  );
};

export default NormalPostModal;
