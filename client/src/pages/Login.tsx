import { Input, Checkbox, Button, Form, message } from "antd";
import "../styles/Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/v1/auth/login", user);
      console.log(res);

      if (res.data.message) {
        message.open({
          type: "success",
          content: res.data.message,
        });
      }
    } catch (err: any) {
      message.open({
        type: "error",
        content: err.response.data.message,
      });

      console.log("Error", err);
    }
  };

  return (
    <div className="Register">
      <div className="left">
        <h2>Log In</h2>
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
          <div className="form-input">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
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
          </div>

          <div className="form-input">
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  type: "string",
                  min: 8,
                },
                {
                  required: true,
                  message: "Please input your Password!",
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
          </div>

          <div className="form-checkbox">
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 0, span: 16 }}
            >
              <Checkbox className="check">Remember Me</Checkbox>
            </Form.Item>
          </div>

          <div className="form-submit">
            <Form.Item>
              <Button htmlType="submit" className="button">
                Login
              </Button>
              <p>
                Don't have an account? <Link to="/signup">SignUp</Link>
              </p>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Login;
