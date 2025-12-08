// src/pages/warehouse/RawMaterialPage/index.jsx
import React, { useEffect, useState } from "react";
import "./RawMaterialPage.scss";

import { useRawMaterialStore } from "../../../entities/rawMaterial/model/useRawMaterialStore";
import RawMaterialOperations from "../../../entities/rawMaterial/ui/RawMaterialOperations";
import RawMaterialTable from "../../../entities/rawMaterial/ui/RawMaterialTable";
import RawMaterialHistory from "../../../entities/rawMaterial/ui/RawMaterialHistory";
import RawMaterialCreateModal from "../../../entities/rawMaterial/ui/RawMaterialCreateModal";
import { useAuthStore } from "../../../shared/store/useAuthStore";

const RawMaterialPage = () => {
  const {
    materials,
    movements,
    fetchAll,
    addIncoming,
    getSummary,
    getFilteredEntries,
  } = useRawMaterialStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const authUser = useAuthStore((s) => s.user);
  const userName = authUser?.username || authUser?.email || "Неизвестно";

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const summary = getSummary();
  const entries = getFilteredEntries();

  const handleIncoming = async ({ materialId, weight, userName }) => {
    await addIncoming({ materialId, weight, userName });
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

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
        recipes={[]}
        onIncoming={handleIncoming}
        onWithdrawByRecipe={() => {}}
        onSimulateWeight={() => 0}
        currentWeight={0}
        userName={userName}
        onAddMaterial={handleOpenCreateModal}
      />

      <RawMaterialTable materials={materials} />

      <RawMaterialHistory entries={entries} />

      {isCreateModalOpen && (
        <RawMaterialCreateModal onClose={handleCloseCreateModal} />
      )}
    </div>
  );
};

export default RawMaterialPage;
