import { useState, useContext } from 'react';
import {
  Input, Button, Form, message, Upload,
} from 'antd';
import Title from 'antd/es/typography/Title';
import '../styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '../components/commons/Box';
import Paragraph from '../components/commons/Paragraph';
import { AuthContext } from '../components/context/AuthContext';
import uploadToCloudinary from '../helpers/uploadToCloudinary';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState< { originFileObj: Blob; name: string | undefined; } >();
  const navigate = useNavigate();
  const { userLogged, setUserLogged } = useContext(AuthContext);

  const defaultAvatr = 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png';

  const normFile = (e: { fileList: { originFileObj: Blob; name: string | undefined; } }) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e.fileList;
  };

  const handleSubmit = async () => {
    try {
      if (avatar) {
        const imageUrl = await uploadToCloudinary(avatar);
        const res = await axios.post('/api/v1/auth/signup', {
          fullName, email, password, phone, userImage: imageUrl || defaultAvatr,
        });
        if (res.data.message) {
          message.open({
            type: 'success',
            content: res.data.message,
          });

          setUserLogged(!userLogged);
          navigate('/explore');
        }
      }
    } catch (err: any) {
      message.open({
        type: 'error',
        content: err.response.data.message,
      });
    }
  };

  return (
    <Box className="Register">
      <Box className="left">
        <Title level={2}>Get Started Now</Title>
        <Form
          onFinish={handleSubmit}
          name="basic"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Box className="form-input">
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  type: 'string',
                  min: 6,
                  message: 'Full name must be at least 6 characters!',
                },
                {
                  required: true,
                  message: 'Please enter your full name!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </Form.Item>
          </Box>
          <Box className="form-input">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Email is not valid !',
                },
                {
                  required: true,
                  message: 'Please enter your email!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>
          </Box>
          <Box className="form-input">
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  type: 'string',
                  min: 8,
                  message: 'The password must be at Least 8 characters',
                },
                {
                  required: true,
                  message: 'Please enter your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                className="input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>
          </Box>
          <Box className="form-input">
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                {
                  type: 'string',
                  min: 10,
                },
              ]}
            >
              <Input
                className="input"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </Form.Item>
          </Box>
          <Box className="form-input">
            <Form.Item className="addPost--uploadField">
              <Form.Item label="Avatar" name="avatar" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                <Upload
                  action=""
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false}
                  onChange={({ fileList }) => {
                    setAvatar(() => fileList[0] as { originFileObj: Blob; name: string | undefined; });
                  }}
                >
                  <Button className="button-upload"> Upload your profile picture</Button>
                </Upload>
              </Form.Item>
            </Form.Item>
          </Box>
          <Box className="form-submit">
            <Form.Item>
              <Button htmlType="submit" className="button">
                SignUp
              </Button>
              <Paragraph>
                Have an account?
                <Link to="/login">Login</Link>
              </Paragraph>
            </Form.Item>
          </Box>
        </Form>
      </Box>
      <Box className="right" />
    </Box>
  );
};

export default SignUp;
