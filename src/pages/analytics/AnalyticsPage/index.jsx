import React from 'react';
import styles from './AnalyticsPage.module.scss';

const AnalyticsPage = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Аналитика</h2>
      <p className={styles.text}>Здесь будут отчёты и ключевые показатели.</p>
    </div>
  );
};

export default AnalyticsPage;