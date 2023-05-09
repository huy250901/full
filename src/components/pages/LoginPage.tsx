import React, { useState } from "react";
import LoginForm from "../LoginForm";
import logo from "../../imgs/logo.svg";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onLogin = () => {};
  return (
    <div
      className="container"
      style={{
        backgroundColor: "#f8f9fa",
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
      <LoginForm />
    </div>
  );
};

export default LoginPage;
