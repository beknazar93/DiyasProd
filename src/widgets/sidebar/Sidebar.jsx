import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { useAuthStore } from "../../shared/store/useAuthStore";

const Sidebar = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const renderLink = (to, label, end = false) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive ? `${styles.link} ${styles.linkActive}` : styles.link
      }
    >
      {label}
    </NavLink>
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoBlock}>
        <div className={styles.logoShort}>DL</div>
        <div className={styles.logoText}>
          <div className={styles.logoTitle}>Diyas Production</div>
          <div className={styles.logoSubtitle}>ERP для производства</div>
        </div>
      </div>

      <div className={styles.sections}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Основное</div>
          {renderLink("/dashboard", "Дашборд", true)}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Склад</div>
          {renderLink("/warehouse/raw-materials", "Склад сырья")}
          {renderLink(
            "/warehouse/finished-products",
            "Склад готовой продукции"
          )}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Производство</div>
          {renderLink("/production/lines", "Этапы производства")}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Продажи и логистика</div>
          {renderLink("/sales/orders", "Отдел продаж")}
          {renderLink("/logistics/shipments", "Логистика")}
          {renderLink("/quality/issues", "ОТК")}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Администрирование</div>
          {renderLink("/reports", "Отчёты / аналитика")}
          {renderLink("/admin/users", "Пользователи")}
        </div>
      </div>

      <div className={styles.footer}>
        {user && (
          <div className={styles.userBlock}>
            <div className={styles.userAvatar}>
              {user.username?.[0]?.toUpperCase() || "A"}
            </div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user.username}</div>
              <div className={styles.userRole}>{user.system_role}</div>
            </div>
          </div>
        )}

        <button type="button" className={styles.logout} onClick={logout}>
          Выйти
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
