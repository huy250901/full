import React, { useEffect, useState } from "react";

import { Button, Form, Input, Select, notification, Space } from "antd";
import { Link, useNavigate, NavLink, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./loginform.css";

const LoginForm = () => {
  const [company, setCompany] = useState<Array<any>>([]);

  useEffect(() => {
    fetch("https://api-training.hrm.div4.pgtest.co/api/v1/company")
      .then((response) => response.json())
      .then((data) => {
        setCompany(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let navigate = useNavigate();

  const [loading, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = "Vui lòng nhập email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Email không hợp lệ";
    }
    return error;
  };

  const validatePassword = (value: string) => {
    let error;
    if (!value) {
      error = "Vui lòng nhập mật khẩu";
    } else if (value.length < 6) {
      error = "Mật khẩu phải có ít nhất 6 kí tự";
    } else if (/\s/.test(value)) {
      return "Mật khẩu không được chứa dấu cách";
    }
    return error;
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      const response = await fetch(
        "https://api-training.hrm.div4.pgtest.co/api/v1/login",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            username: values.username,
            password: values.password,
            company_id: values.factory,
          }),
        }
      );
      const result = await response.json();

      if (result.message === "Success") {
        const token = result.data.token;
        Cookies.set("token", token, { expires: 7 });
        notification.success({
          message: "Login successful",
          description: "Welcome back!",
        });
        navigate("/home");
      } else {
        console.log("error");

        notification.error({
          message: "Login failed",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error calling API: ", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="form-login"
      style={{
        width: "348px",
        height: "435px",
        padding: "24px",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 600,
          padding: "24px",
          backgroundColor: "#fff",
          borderRadius: "6px",
          boxShadow: "2px 1px 5px rgb(0 0 0 / 18%)",
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div>
          <Form.Item label="Factory">
            <Space.Compact>
              <Form.Item
                name="factory"
                noStyle
                rules={[{ required: true, message: "Please" }]}
              >
                <Select
                  placeholder="Select Factory"
                  style={{
                    width: "100%",
                    fontWeight: 500,
                    color: "#687076",
                  }}
                  options={company.map((option) => ({
                    value: option.id,
                    label: option.name,
                  }))}
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "8px",
            marginBottom: "8px",
            width: "100%",
          }}
        >
          <Button
            style={{ margin: "8px 0 0 0" }}
            size="large"
            type="primary"
            htmlType="submit"
            // loading={loadings[0]}
            onClick={() => enterLoading(0)}
          >
            Sign In
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Link to="/reset-password">
              <button className="btn_fg">Forgot Your Password?</button>
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
