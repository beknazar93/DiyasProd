import React from 'react';
import styles from './QualityControlPage.module.scss';

const QualityControlPage = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Контроль качества</h2>
      <p className={styles.text}>Здесь будут проверки качества и дефекты.</p>
    </div>
  );
};

export default QualityControlPage;