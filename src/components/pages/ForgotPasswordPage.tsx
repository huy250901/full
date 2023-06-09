import React, { useState } from "react";
import LoginForm from "../LoginForm";
import logo from "../../imgs/logo.svg";
import ForgotPassword from "../ForgotPasswordForm";

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onLogin = () => {};
  return (
    <div
      className="container"
      style={{
        marginTop: "50px",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
    >
      <img src={logo} alt="" style={{ width: "100", height: "100" }} />
      <h2>HR Management System</h2>
      <h2>Sign In</h2>
      <ForgotPassword />
    </div>
  );
};

export default ForgotPasswordPage;
