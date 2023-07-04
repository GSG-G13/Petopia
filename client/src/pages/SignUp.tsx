import {
  Input, Checkbox, Button, Form, message,
} from 'antd';
import Title from 'antd/es/typography/Title';
import '../styles/Register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Box from '../components/commons/Box';
import Paragraph from '../components/commons/Paragraph';

const SignUp = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/api/v1/auth/signup', user);

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
                  min: 3,
                },
                {
                  required: true,
                  message: 'Please input your fullName!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input"
                value={user.fullName}
                onChange={(e) => {
                  setUser({ ...user, fullName: e.target.value });
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

          <Box className="form-input">
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The new password that you entered do not match!',
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input.Password className="input" />
            </Form.Item>
          </Box>

          <Box className="form-checkbox">
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 0, span: 16 }}
            >
              <Checkbox className="check">I agree to the terms & policy</Checkbox>
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
