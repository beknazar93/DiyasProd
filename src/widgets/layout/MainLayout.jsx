import React from "react";
import { NavLink } from "react-router-dom";
import "./MainLayout.scss";
import { useAuthStore } from "../../shared/store/useAuthStore";

const NAV_ITEMS = [
  { to: "/", label: "Дашборд" },
  { to: "/warehouse/raw", label: "Склад сырья" },
  { to: "/warehouse/finished", label: "Склад готовой продукции" },
  { to: "/production/stages", label: "Этапы производства" },
  { to: "/sales", label: "Отдел продаж" },
  { to: "/logistics", label: "Логистика" },
  { to: "/quality", label: "ОТК" },
  { to: "/reports", label: "Отчёты" },
  { to: "/analytics", label: "Аналитика" },
  { to: "/users", label: "Пользователи" },
];

const MainLayout = ({ children }) => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="main-layout">
      <aside className="main-layout__sidebar">
        <div className="main-layout__logo">
          <div className="main-layout__logo-mark">DP</div>
          <div className="main-layout__logo-text">
            <div className="main-layout__logo-title">Diyas Production</div>
            <div className="main-layout__logo-subtitle">
              ERP для производства
            </div>
          </div>
        </div>

        <nav className="main-layout__nav">
          <div className="main-layout__nav-section">
            <div className="main-layout__nav-section-title">Основное</div>
            {NAV_ITEMS.slice(0, 4).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  "main-layout__nav-link" +
                  (isActive ? " main-layout__nav-link--active" : "")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="main-layout__nav-section">
            <div className="main-layout__nav-section-title">
              Продажи и логистика
            </div>
            {NAV_ITEMS.slice(4, 7).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  "main-layout__nav-link" +
                  (isActive ? " main-layout__nav-link--active" : "")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="main-layout__nav-section">
            <div className="main-layout__nav-section-title">
              Администрирование
            </div>
            {NAV_ITEMS.slice(7).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  "main-layout__nav-link" +
                  (isActive ? " main-layout__nav-link--active" : "")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="main-layout__sidebar-footer">
          {user && (
            <div className="main-layout__user">
              <div className="main-layout__user-avatar">
                {user.username
                  ? user.username.charAt(0).toUpperCase()
                  : (user.email || "?").charAt(0).toUpperCase()}
              </div>
              <div className="main-layout__user-info">
                <div className="main-layout__user-name">
                  {user.username || user.email}
                </div>
                {user.system_role && (
                  <div className="main-layout__user-role">{user.system_role}</div>
                )}
              </div>
            </div>
          )}

          <button
            type="button"
            className="main-layout__logout"
            onClick={logout}
          >
            Выйти
          </button>
        </div>
      </aside>

      <div className="main-layout__body">
        <header className="main-layout__header">
          <div className="main-layout__header-title">Панель управления</div>
        </header>

        <main className="main-layout__content">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
