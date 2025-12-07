import React from 'react';
import styles from './ReportsPage.module.scss';

const ReportsPage = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Отчёты</h2>
      <p className={styles.text}>Здесь будут отчёты по производству, складам и продажам.</p>
    </div>
  );
};

export default ReportsPage;