import {  Avatar, Button, Row, Col, Typography, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

const data = [
  { id: 1, name: 'Mohammad', username: 'username', avatar: 'https://media.discordapp.net/attachments/1112051630985187378/1122439026163601531/5308de68ed17c97ce5e45cef8f648dbb.png?width=320&height=320' },
  { id: 2, name: 'Mohammad', username: 'username', avatar: 'https://media.discordapp.net/attachments/1112051630985187378/1122439026390073394/38308a08c26e275d9560bcbabeb74324.png?width=320&height=320' },
  { id: 3, name: 'Mohammad', username: 'username', avatar: 'ellipse-1-2.png' },
  { id: 4, name: 'Mohammad', username: 'username', avatar: 'ellipse-1-3.png' },
  { id: 5, name: 'Mohammad', username: 'username', avatar: 'ellipse-1-4.png' },
];

const UsersModal = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
    
  const handleOk = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div>
      <Modal
        title="Likes"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={650}
        style={{ top: 20 }}
      >
        {data.map(item => (
          <Row key={item.id} style={{ marginBottom: 16, alignItems: 'center' }} align="middle">
            <Col flex="auto">
              <Row align="middle" gutter={8}>
                <Col>
                  <Avatar src={item.avatar} shape="circle" style={{height:50, width:50}} icon={<UserOutlined />} />
                </Col>
                <Col>
                  <Title level={5}>{item.name}</Title>
                </Col>
              </Row>
            </Col>
            <Col>
              <Button type="dashed" shape="round">Follow</Button>
            </Col>
          </Row>
        ))}
      </Modal>
    </div>
  );
};

export default UsersModal;
