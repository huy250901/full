import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ILoginFormValues,
  ILoginParams,
  ILoginValidation,
} from "../models/auth";
import {
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select, Space } from "antd";
import {
  Link,
  useNavigate,
  NavLink,
} from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import "./loginform.css";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    defaultValues: { username: "", password: "" },
  });

  const [company, setCompany] = useState<Array<any>>([]);

  useEffect(() => {
    fetch(
      "https://api-training.hrm.div4.pgtest.co/api/v1/company"
    )
      .then((response) => response.json())
      .then((data) => {
        setCompany(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

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
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z.-]+\.[A-Z]{2,}$/i.test(value)
    ) {
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

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onSubmit = async (data: ILoginFormValues) => {
    try {
      const response = await fetch(
        "https://api-training.hrm.div4.pgtest.co/api/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        // Do something with the response data
      } else {
        console.error(
          "Error calling API: ",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error calling API: ", error);
    }
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
      {/* <form
        onSubmit={handleSubmit(onSubmit)}
        className="form"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      > */}
      {/* <div>
          <div style={{ display: "flex", marginBottom: "12px" }}>
            Username :
          </div>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              validate: {
                emailValue: (value) => validateEmail(value),
              },
            }}
            render={({ field }) => <input className="input-login" {...field} />}
          />
          {errors.username && (
            <small className="text-danger">{errors.username.message}</small>
          )}
        </div> */}
      {/* <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", marginBottom: "12px" }}>
            Password :
          </div>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              validate: {
                minLength: (value) => validatePassword(value),
              },
            }}
            render={({ field }) => (
              <input className="input-login" type="password" {...field} />
            )}
          />
          {errors.password && (
            <small className="text-danger">{errors.password.message}</small>
          )}
        </div> */}

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
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
          {/* <div
            style={{
              display: "flex",
              width: "296px",
              marginBottom: "12px",
            }}
          >
            Factory
          </div> */}
          <Form.Item label="Factory">
            <Space.Compact>
              <Form.Item
                name="factory"
                noStyle
                rules={[
                  { required: true, message: "Please" },
                ]}
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
              <button className="btn_fg">
                Forgot Your Password?
              </button>
            </Link>
          </div>
        </div>
      </Form>
      {/* </form> */}
    </div>
  );
};

export default LoginForm;
