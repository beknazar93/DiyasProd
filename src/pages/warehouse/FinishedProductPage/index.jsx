import React from 'react';
import styles from './FinishedProductPage.module.scss';

const FinishedProductPage = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Склад готовой продукции</h2>
      <p className={styles.text}>Здесь будет учёт готовых изделий, их отгрузка и резервы.</p>
    </div>
  );
};

export default FinishedProductPage;