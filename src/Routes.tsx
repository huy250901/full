import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
// import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/reset-password" element={<ForgotPasswordPage />} />
    </Routes>
  );
}
export default Router;
