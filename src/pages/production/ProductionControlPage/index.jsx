import React from 'react';
import styles from './ProductionControlPage.module.scss';

const ProductionControlPage = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Производственный контроль</h2>
      <p className={styles.text}>Здесь будет управление партиями и сменами операторов.</p>
    </div>
  );
};

export default ProductionControlPage;