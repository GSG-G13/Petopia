import {
  Input, Button, Form, message,
} from 'antd';
import Title from 'antd/es/typography/Title';
import '../styles/Register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Box from '../components/commons/Box';
import Paragraph from '../components/commons/Paragraph';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/v1/auth/login', user);

      if (res.data.message) {
        message.open({
          type: 'success',
          content: res.data.message,
        });
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
        <Title level={2}>Log In</Title>
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
              label="Email"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
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
                },
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                className="input"
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
            </Form.Item>
          </Box>

          <Box className="form-submit">
            <Form.Item>
              <Button htmlType="submit" className="button">
                Login
              </Button>
              <Paragraph>
                Dont have an account?
                <Link to="/signup">SignUp</Link>
              </Paragraph>
            </Form.Item>
          </Box>
        </Form>
      </Box>
      <Box className="right" />
    </Box>
  );
};

export default Login;
