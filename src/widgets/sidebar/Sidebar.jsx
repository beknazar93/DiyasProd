import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { useAuthStore } from '../../shared/store/useAuthStore';

const Sidebar = () => {
  const logout = useAuthStore((s) => s.logout);

  const linkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>ERP</div>
      <nav className={styles.nav}>
        <NavLink to="/" className={linkClass}>
          Дашборд
        </NavLink>
        <NavLink to="/warehouse/raw" className={linkClass}>
          Склад сырья
        </NavLink>
        <NavLink to="/warehouse/finished" className={linkClass}>
          Готовая продукция
        </NavLink>
        <NavLink to="/production/stages" className={linkClass}>
          Этапы производства
        </NavLink>
        <NavLink to="/sales" className={linkClass}>
          Отдел продаж
        </NavLink>
        <NavLink to="/logistics" className={linkClass}>
          Логистика
        </NavLink>
        <NavLink to="/analytics" className={linkClass}>
          Аналитика
        </NavLink>
      </nav>

      <button className={styles.logout} onClick={logout}>
        Выйти
      </button>
    </aside>
  );
};

export default Sidebar;