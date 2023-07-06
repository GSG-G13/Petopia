import {
  Input, Button, Form, message,
} from 'antd';
import Title from 'antd/es/typography/Title';
import '../styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Box from '../components/commons/Box';
import Paragraph from '../components/commons/Paragraph';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/v1/auth/login', { email, password });

      if (res.data.message) {
        message.open({
          type: 'success',
          content: res.data.message,
        });
        navigate('/feed');
      }
    } catch (err) {
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
                  message: 'The Input Is Not A Valid Email!',
                },
                {
                  required: true,
                  message: 'Please Enter Your Email!',
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
                  message: 'The Password Must Be At Least 8 Characters',
                },
                {
                  required: true,
                  message: 'Please Enter Your Password!',
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
