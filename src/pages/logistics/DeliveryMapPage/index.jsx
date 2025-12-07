import React from 'react';
import styles from './DeliveryMapPage.module.scss';

const DeliveryMapPage = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Карта доставок</h2>
      <p className={styles.text}>Здесь будут маршруты, точки доставки и статусы.</p>
    </div>
  );
};

export default DeliveryMapPage;