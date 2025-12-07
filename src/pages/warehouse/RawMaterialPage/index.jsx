// src/pages/warehouse/RawMaterialPage/index.jsx
import React, { useEffect, useState } from "react";
import "./RawMaterialPage.scss";

import { useRawMaterialStore } from "../../../entities/rawMaterial/model/useRawMaterialStore";
import RawMaterialOperations from "../../../entities/rawMaterial/ui/RawMaterialOperations";
import RawMaterialTable from "../../../entities/rawMaterial/ui/RawMaterialTable";
import RawMaterialHistory from "../../../entities/rawMaterial/ui/RawMaterialHistory";
import RawMaterialIncomingModal from "../../../entities/rawMaterial/ui/RawMaterialIncomingModal";
import { useAuthStore } from "../../../shared/store/useAuthStore";

const RawMaterialPage = () => {
  const materials = useRawMaterialStore((s) => s.materials || []);
  const movements =
    useRawMaterialStore((s) => s.movements || s.entries || []) || [];

  const fetchAll = useRawMaterialStore((s) => s.fetchAll);
  const addIncoming = useRawMaterialStore((s) => s.addIncoming);
  const withdrawByRecipe = useRawMaterialStore((s) => s.withdrawByRecipe);

  const authUser = useAuthStore((s) => s.user);
  const userName = authUser?.username || authUser?.email || "Неизвестно";

  const [incomingModalOpen, setIncomingModalOpen] = useState(false);
  const [incomingDraft, setIncomingDraft] = useState(null);

  useEffect(() => {
    if (fetchAll) {
      fetchAll();
    }
  }, [fetchAll]);

  const totalPositions = materials.length;
  const totalQuantity = materials.reduce(
    (sum, m) => sum + Number(m.quantity ?? m.balance ?? 0),
    0
  );
  const lowStockCount = materials.filter((m) => {
    if (m.min_quantity == null) return false;
    const qty = Number(m.quantity ?? m.balance ?? 0);
    return qty <= Number(m.min_quantity);
  }).length;

  const summary = {
    totalPositions,
    totalQuantity,
    lowStockCount,
  };

  const openIncomingModal = (draft) => {
    setIncomingDraft(draft || {});
    setIncomingModalOpen(true);
  };

  const closeIncomingModal = () => {
    setIncomingModalOpen(false);
  };

  const handleIncoming = async ({ materialId, weight, userName }) => {
    if (!addIncoming || !materialId) return;

    const qty = Number(weight) || 0;

    try {
      // оба варианта: (materialId, qty, userName) ИЛИ ({ ... })
      if (addIncoming.length >= 2) {
        await addIncoming(materialId, qty, userName);
      } else {
        await addIncoming({
          material_id: materialId,
          quantity: qty,
          user_name: userName,
          movement_type: "incoming",
        });
      }

      fetchAll && fetchAll();
    } catch (e) {
      console.error("Ошибка при добавлении прихода сырья", e);
    }
  };

  const handleWithdrawByRecipe = async ({ recipeId, multiplier, userName }) => {
    if (!withdrawByRecipe || !recipeId) return;

    const mul = Number(multiplier) || 1;

    try {
      if (withdrawByRecipe.length >= 2) {
        await withdrawByRecipe(recipeId, mul, userName);
      } else {
        await withdrawByRecipe({
          recipe_id: recipeId,
          multiplier: mul,
          user_name: userName,
        });
      }

      fetchAll && fetchAll();
    } catch (e) {
      console.error("Ошибка при списании по рецепту", e);
    }
  };

  const entries = Array.isArray(movements) ? movements : [];

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
        onIncoming={handleIncoming} // запасной вариант
        onOpenIncomingModal={openIncomingModal} // ⬅️ отсюда открываем модалку
        onWithdrawByRecipe={handleWithdrawByRecipe}
        onSimulateWeight={() => 0}
        currentWeight={0}
        userName={userName}
      />

      <RawMaterialTable materials={materials} />

      <RawMaterialHistory entries={entries} />

      <RawMaterialIncomingModal
        open={incomingModalOpen}
        onClose={closeIncomingModal}
        materials={materials}
        userName={userName}
        defaultMaterialId={incomingDraft?.materialId}
        defaultWeight={incomingDraft?.weight}
        onConfirm={async (payload) => {
          await handleIncoming(payload);
          closeIncomingModal();
        }}
      />
    </div>
  );
};

export default RawMaterialPage;
