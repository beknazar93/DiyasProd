// src/features/auth/login/ui/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../shared/store/useAuthStore";
import Input from "../../../../shared/ui/Input/Input";
import Button from "../../../../shared/ui/Button/Button";
import "./LoginForm.scss";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(form.email, form.password);

    // 🔥 Если логин прошёл — улетаем на дашборд
    if (success) {
      navigate("/dashboard"); // или "/" если хочешь
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__field">
        <label className="login-form__label">Email</label>
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Введите email"
          autoComplete="email"
        />
      </div>

      <div className="login-form__field">
        <label className="login-form__label">Пароль</label>
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Введите пароль"
          autoComplete="current-password"
        />
      </div>

      {error && <div className="login-form__error">{error}</div>}

      <Button type="submit" disabled={loading}>
        {loading ? "Входим..." : "Войти"}
      </Button>
    </form>
  );
};

export default LoginForm;
