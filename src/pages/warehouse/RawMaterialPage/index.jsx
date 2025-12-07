import React, { useEffect } from "react";
import MainLayout from "../../../widgets/layout/MainLayout";
import "./RawMaterialPage.scss";

import { useAuthStore } from "../../../shared/store/useAuthStore";
import { useRawMaterialStore } from "../../../entities/rawMaterial/model/useRawMaterialStore";

import RawMaterialOperations from "../../../entities/rawMaterial/ui/RawMaterialOperations";
import RawMaterialTable from "../../../entities/rawMaterial/ui/RawMaterialTable";
import RawMaterialHistory from "../../../entities/rawMaterial/ui/RawMaterialHistory";

const RawMaterialPage = () => {
  const {
    materials,
    fetchAll,
    addIncoming,
    withdrawByRecipe,
    getFilteredEntries,
    getSummary,
  } = useRawMaterialStore();

  const authUser = useAuthStore((s) => s.user);
  const userName = authUser?.username || authUser?.email || "Неизвестно";

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const entries = getFilteredEntries();
  const summary = getSummary();

  return (
    <div className="rawm-page">
      <div className="rawm-page__header">
        <div>
          <h2 className="rawm-page__title">Склад сырья</h2>
          <p className="rawm-page__subtitle">
            Управляйте остатками сырья, поступлениями и списаниями.
          </p>
        </div>

        <div className="rawm-page__summary">
          <div className="rawm-page__summary-item">
            <span className="rawm-page__summary-label">Позиций</span>
            <span className="rawm-page__summary-value">
              {summary.totalPositions}
            </span>
          </div>
          <div className="rawm-page__summary-item">
            <span className="rawm-page__summary-label">Общий остаток, кг</span>
            <span className="rawm-page__summary-value">
              {summary.totalQuantity.toLocaleString("ru-RU")}
            </span>
          </div>
          <div className="rawm-page__summary-item">
            <span className="rawm-page__summary-label">Требуют внимания</span>
            <span
              className={
                summary.lowStockCount > 0
                  ? "rawm-page__summary-value rawm-page__summary-value--warning"
                  : "rawm-page__summary-value"
              }
            >
              {summary.lowStockCount}
            </span>
          </div>
        </div>
      </div>

      <RawMaterialOperations
        materials={materials}
        recipes={[]} // рецепты можешь докинуть позже
        onIncoming={addIncoming}
        onWithdrawByRecipe={withdrawByRecipe}
        onSimulateWeight={() => 0} // сюда потом подключишь весы
        currentWeight={0}
        userName={userName}
      />

      <RawMaterialTable materials={materials} />

      <RawMaterialHistory entries={entries} />
    </div>
  );
};

export default RawMaterialPage;
