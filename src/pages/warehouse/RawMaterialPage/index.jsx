// src/pages/warehouse/RawMaterialPage/index.jsx
import React from "react";
import "./RawMaterialPage.scss";
import MainLayout from "../../../widgets/layout/MainLayout";
import { useRawMaterialStore } from "../../../entities/rawMaterial/model/useRawMaterialStore";
import RawMaterialTable from "../../../entities/rawMaterial/ui/RawMaterialTable";
import RawMaterialOperations from "../../../entities/rawMaterial/ui/RawMaterialOperations";
import RawMaterialHistory from "../../../entities/rawMaterial/ui/RawMaterialHistory";

const RawMaterialPage = () => {
  const materials = useRawMaterialStore((s) => s.materials);
  const recipes = useRawMaterialStore((s) => s.recipes);
  const currentWeight = useRawMaterialStore((s) => s.currentWeight);
  const simulateWeight = useRawMaterialStore((s) => s.simulateWeight);
  const addIncoming = useRawMaterialStore((s) => s.addIncoming);
  const withdrawByRecipe = useRawMaterialStore((s) => s.withdrawByRecipe);
  const getFilteredEntries = useRawMaterialStore((s) => s.getFilteredEntries);
  const getSummary = useRawMaterialStore((s) => s.getSummary);

  const entries = getFilteredEntries();
  const summary = getSummary();
  const userName = "Админ склада";

  return (
    <div className="rawm-page">
      <div className="rawm-page__header">
        <div>
          <h2 className="rawm-page__title">Склад сырья</h2>
          <p className="rawm-page__subtitle">
            Управляйте остатками сырья, поступлениями и списаниями
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
        recipes={recipes}
        onIncoming={addIncoming}
        onWithdrawByRecipe={withdrawByRecipe}
        onSimulateWeight={simulateWeight}
        currentWeight={currentWeight}
        userName={userName}
      />

      <RawMaterialTable materials={materials} />

      <RawMaterialHistory entries={entries} />
    </div>
  );
};

export default RawMaterialPage;
