import React, { useEffect } from "react";
import MainLayout from "../../../widgets/layout/MainLayout";
import "./FinishedProductPage.scss";

import { useFinishedProductStore } from "../../../entities/finishedProduct/model/useFinishedProductStore";

import FinishedProductTable from "../../../entities/finishedProduct/ui/FinishedProductTable";

const FinishedProductPage = () => {
  const { products, fetchProducts } = useFinishedProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="finished-page">
      <div className="finished-page__header">
        <h2 className="finished-page__title">Склад готовой продукции</h2>
        <p className="finished-page__subtitle">
          Остатки готовой продукции, резервы и отгрузки.
        </p>
      </div>

      <FinishedProductTable products={products} />
    </div>
  );
};

export default FinishedProductPage;
