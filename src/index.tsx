import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LoginForm from "./components/LoginForm";
import { ILoginParams } from "./models/auth";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <LoginForm
//         onLogin={function (values: ILoginParams): void {
//           throw new Error("Function not implemented.");
//         }}
//         loadingg={false}
//         errorMessage={""}
//       />
//     ),
//   },
//   {
//     path: "/reset-password",
//     element: <ForgotPasswordForm />,
//   },
// ]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
