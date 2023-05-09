import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
// import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import HomePage from "./components/pages/HomePage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/reset-password" element={<ForgotPasswordPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}
export default Router;
