import React from 'react';
import styles from './UserManagementPage.module.scss';

const UserManagementPage = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Управление пользователями</h2>
      <p className={styles.text}>Здесь будут сотрудники, роли и доступы.</p>
    </div>
  );
};

export default UserManagementPage;