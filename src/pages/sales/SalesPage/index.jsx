import React from 'react';
import styles from './SalesPage.module.scss';

const SalesPage = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Отдел продаж</h2>
      <p className={styles.text}>Здесь будут клиенты, заказы и счета.</p>
    </div>
  );
};

export default SalesPage;