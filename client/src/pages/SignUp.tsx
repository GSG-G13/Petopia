import { Input, Checkbox, Button, Form, Alert } from "antd";
import "../styles/Register.css";
import { Link } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";

function SignUp() {
  const [showAlert, setShowAlert] = useState(false);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    msg: "",
  });

  useEffect(() => {
    if (user.msg !== "") {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [user.msg]);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setUser({ ...user, msg: "" });
      if (user.fullName !== "" && user.email !== "" && user.password !== "") {
        const res = await axios.post("/api/v1/auth/signup", user);
        if (res.data.message) {
          setUser({ ...user, msg: res.data.message });
        }
      }
    } catch (err) {
      setUser({ ...user, msg: "This email already exists!" });
      console.log("Error", err);
    }
  };

  return (
    <div className="Register">
      <div className="left">
        <h2>Get Started Now</h2>
        {showAlert &&
          (user.msg !== "This email already exists!" ? (
            <Alert message={user.msg} type="success" className="alert-msg" />
          ) : (
            <Alert message={user.msg} type="error" className="alert-msg" />
          ))}
        <Form
          onSubmitCapture={handleSubmit}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <div className="form-input">
            <Form.Item
              label="FullName"
              name="fullName"
              rules={[
                {
                  type: "string",
                  min: 3,
                },
                {
                  required: true,
                  message: "Please input your fullName!",
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
          </div>
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

          <div className="form-input">
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password className="input" />
            </Form.Item>
          </div>

          <div className="form-checkbox">
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>I agree to the terms & policy</Checkbox>
            </Form.Item>
          </div>

          <div className="form-submit">
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button htmlType="submit" className="button">
                SignUp
              </Button>
            </Form.Item>
          </div>
        </Form>
        <p>
          Have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default SignUp;
