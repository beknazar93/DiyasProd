import React from 'react';
import styles from './CustomerCardPage.module.scss';

const CustomerCardPage = () => {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Карточка клиента</h2>
      <p className={styles.text}>Здесь будут клиенты, контакты и история заказов.</p>
    </div>
  );
};

export default CustomerCardPage;