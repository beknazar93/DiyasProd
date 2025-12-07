import React from "react";
import "./RawMaterialHistory.scss";

const RawMaterialHistory = ({ entries }) => {
  const rows = Array.isArray(entries) ? entries : [];

  if (!rows.length) {
    return (
      <div className="rawm-history">
        <div className="rawm-history__header">
          <h3 className="rawm-history__title">История операций</h3>
          <p className="rawm-history__subtitle">
            Здесь будут показаны все приходы и списания по складу сырья.
          </p>
        </div>
        <div className="rawm-history__empty">
          История ещё пуста. Создайте приход или списание, чтобы увидеть записи.
        </div>
      </div>
    );
  }

  return (
    <div className="rawm-history">
      <div className="rawm-history__header">
        <h3 className="rawm-history__title">История операций</h3>
        <p className="rawm-history__subtitle">
          Последние операции по приходу и списанию сырья.
        </p>
      </div>

      <div className="rawm-history__list">
        {rows.map((entry, idx) => {
          const id = entry.id ?? idx;
          const type = entry.type || entry.operation_type || "operation";
          const isIncoming = type === "incoming" || type === "in";
          const materialName =
            entry.materialName || entry.material_name || entry.material || "—";
          const weight = entry.weight ?? entry.quantity ?? 0;
          const unit = entry.unit || "кг";
          const user =
            entry.userName || entry.user_name || entry.username || "Неизвестно";
          const createdAt =
            entry.created_at ||
            entry.date ||
            entry.timestamp ||
            entry.createdAt ||
            "";

          return (
            <div className="rawm-history__item" key={id}>
              <div className="rawm-history__item-main">
                <span
                  className={
                    isIncoming
                      ? "rawm-history__badge rawm-history__badge--incoming"
                      : "rawm-history__badge rawm-history__badge--outgoing"
                  }
                >
                  {isIncoming ? "Приход" : "Списание"}
                </span>
                <span className="rawm-history__material">{materialName}</span>
              </div>

              <div className="rawm-history__item-meta">
                <span className="rawm-history__meta">
                  {weight} {unit}
                </span>
                {createdAt && (
                  <span className="rawm-history__meta rawm-history__meta--muted">
                    {createdAt}
                  </span>
                )}
                <span className="rawm-history__meta rawm-history__meta--muted">
                  Оператор: {user}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RawMaterialHistory;
