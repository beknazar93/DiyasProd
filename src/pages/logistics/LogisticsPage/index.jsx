import React from 'react';
import styles from './LogisticsPage.module.scss';

const LogisticsPage = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Логистика</h2>
      <p className={styles.text}>Здесь будут отгрузки, транспорт и маршруты.</p>
    </div>
  );
};

export default LogisticsPage;