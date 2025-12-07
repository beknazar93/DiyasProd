// src/pages/auth/LoginPage/index.jsx
import React from "react";
import "./LoginPage.scss";
import LoginForm from "../../../features/auth/login/ui/LoginForm";

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-page__card">
        <h1 className="login-page__title">Вход в ERP</h1>
        <p className="login-page__subtitle">
          Введите email и пароль администратора
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
