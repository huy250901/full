import React, { useCallback, useEffect, useState } from "react";
import {
  ILoginFormValues,
  ILoginParams,
  ILoginValidation,
} from "../models/auth";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space } from "antd";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import "./loginform.css";
// interface Props {
//   onLogin(values: ILoginParams): void;
//   loadingg: boolean;
//   errorMessage: string;
// }

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    defaultValues: { username: "", password: "" },
  });

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
  });

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

  const onSubmit = async (data: ILoginFormValues) => {
    try {
      const response = await fetch(
        "https://api-training.hrm.div4.pgtest.co/api/v1/login",
        {
          method: "POST",
          body: JSON.stringify({
            username: data.username,
            password: data.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.code === 200) {
        // toast.success("Đăng nhập thành công!", {
        //   autoClose: 2000,
        // });
        // setTimeout(() => {
        //   navigate("/profile");
        // }, 3000);
        // console.log(result.data);
        // Redirect to home page
      } else {
        // toast.error("Đăng nhập thất bại!", {
        //   autoClose: 2000,
        // });
      }
    } catch (error) {
      console.log(error);
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ display: "flex", marginBottom: "12px" }}>
            Your work email
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
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "8px",
            marginBottom: "8px",
            width: "300px",
          }}
        >
          <Button
            style={{ margin: "8px 0 0 0" }}
            size="large"
            type="primary"
            htmlType="submit"
            // loading={loadings[0]}
            // onClick={() => enterLoading(0)}
          >
            Confirm & Send OTP
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Link to="/">
              <button className="btn_fg">Back to Sign In</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
