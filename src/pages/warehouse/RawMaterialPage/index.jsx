import React, { useEffect, useState } from "react";
import "./RawMaterialPage.scss";

import { useRawMaterialStore } from "../../../entities/rawMaterial/model/useRawMaterialStore";
import RawMaterialOperations from "../../../entities/rawMaterial/ui/RawMaterialOperations";
import RawMaterialTable from "../../../entities/rawMaterial/ui/RawMaterialTable";
import RawMaterialHistory from "../../../entities/rawMaterial/ui/RawMaterialHistory";
import RawMaterialCreateModal from "../../../entities/rawMaterial/ui/RawMaterialCreateModal";
import { useAuthStore } from "../../../shared/store/useAuthStore";

const RawMaterialPage = () => {
  const { materials, movements, fetchAll, addIncoming, getSummary } =
    useRawMaterialStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const authUser = useAuthStore((s) => s.user);
  const userName = authUser?.username || authUser?.email || "Неизвестно";

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const summary = getSummary();
  const entries = Array.isArray(movements) ? movements : [];

  const handleIncoming = async ({ materialId, weight, userName }) => {
    await addIncoming({ materialId, weight, userName });
  };

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  return (
    <div className="rawm-page">
      {/* верх: заголовок + кнопка */}
      <div className="rawm-page__top">
        <div className="rawm-page__top-left">
          <h1 className="rawm-page__title">Учёт сырья и материалов</h1>
          <p className="rawm-page__subtitle">
            Взвешивание и управление остатками.
          </p>
        </div>

        <button
          type="button"
          className="rawm-page__add-btn"
          onClick={handleOpenCreateModal}
        >
          <span className="rawm-page__add-btn-icon">+</span>
          <span>Добавить материал</span>
        </button>
      </div>

      {/* карточки-статы */}
      <div className="rawm-page__stats">
        <div className="rawm-page__stat-card">
          <div className="rawm-page__stat-icon rawm-page__stat-icon--blue">
            <span role="img" aria-label="cube">
              📦
            </span>
          </div>
          <div className="rawm-page__stat-body">
            <div className="rawm-page__stat-label">Всего материалов</div>
            <div className="rawm-page__stat-value">
              {summary.totalPositions || 0}
            </div>
          </div>
        </div>

        <div className="rawm-page__stat-card">
          <div className="rawm-page__stat-icon rawm-page__stat-icon--red">
            <span role="img" aria-label="low">
              📉
            </span>
          </div>
          <div className="rawm-page__stat-body">
            <div className="rawm-page__stat-label">Низкие остатки</div>
            <div className="rawm-page__stat-value">
              {summary.lowStockCount || 0}
            </div>
          </div>
        </div>

        <div className="rawm-page__stat-card">
          <div className="rawm-page__stat-icon rawm-page__stat-icon--green">
            <span role="img" aria-label="scale">
              ⚖️
            </span>
          </div>
          <div className="rawm-page__stat-body">
            <div className="rawm-page__stat-label">Общий вес на складе</div>
            <div className="rawm-page__stat-value">
              {(summary.totalQuantity || 0).toLocaleString("ru-RU")} кг
            </div>
          </div>
        </div>
      </div>

      {/* список + операции + история */}
      <div className="rawm-page__content">
        <section className="rawm-page__card rawm-page__card--full">
          <div className="rawm-page__card-header">
            <h2 className="rawm-page__section-title">Список материалов</h2>
          </div>
          <RawMaterialTable materials={materials} />
        </section>

        <section className="rawm-page__card">
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
        </section>

        <section className="rawm-page__card">
          <RawMaterialHistory entries={entries} />
        </section>
      </div>

      {isCreateModalOpen && (
        <RawMaterialCreateModal onClose={handleCloseCreateModal} />
      )}
    </div>
  );
};

export default RawMaterialPage;
