import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>ERP панель</h1>
      <div className={styles.right}>
        <span className={styles.user}>Пользователь</span>
      </div>
    </header>
  );
};

export default Header;