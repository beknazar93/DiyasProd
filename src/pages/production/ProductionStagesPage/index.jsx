import React from 'react';
import styles from './ProductionStagesPage.module.scss';

const ProductionStagesPage = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Этапы производства</h2>
      <p className={styles.text}>Здесь будут статусы партий, этапы и контроль качества.</p>
    </div>
  );
};

export default ProductionStagesPage;