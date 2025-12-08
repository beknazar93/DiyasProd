import React from "react";
import "./RawMaterialTable.scss";

const RawMaterialTable = ({ materials }) => {
  const rows = Array.isArray(materials) ? materials : [];

  if (!rows.length) {
    return (
      <div className="rawm-table">
        <div className="rawm-table__header-row">
          <div>
            <h3 className="rawm-table__title">Текущие остатки сырья</h3>
            <p className="rawm-table__subtitle">
              Здесь будут показаны позиции со склада сырья.
            </p>
          </div>
        </div>
        <div className="rawm-table__empty">Нет данных по складу сырья</div>
      </div>
    );
  }

  return (
    <div className="rawm-table">
      <div className="rawm-table__header-row">
        <div>
          <h3 className="rawm-table__title">Текущие остатки сырья</h3>
          <p className="rawm-table__subtitle">
            Список материалов с остатками и контроль минимального уровня.
          </p>
        </div>
      </div>

      <div className="rawm-table__scroll">
        <table className="rawm-table__table">
          <thead>
            <tr>
              <th>Материал</th>
              <th>Группа</th>
              <th>Ед. изм.</th>
              <th>Остаток</th>
              <th>Мин. остаток</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => {
              const unit = m.unit || "кг";
              const current = m.current_quantity ?? m.quantity ?? m.stock ?? 0;
              const min = m.min_quantity ?? m.minStock ?? 0;
              const isLow = Number(current) <= Number(min) && Number(min) > 0;

              return (
                <tr key={m.id || m.name}>
                  <td>{m.name}</td>
                  <td>{m.group || m.category || "—"}</td>
                  <td>{m.unit}</td>
                  <td>{m.currentStock}</td>
                  <td>{m.minStock || "—"}</td>
                  <td>
                    <span
                      className={
                        isLow
                          ? "rawm-table__status rawm-table__status--low"
                          : "rawm-table__status rawm-table__status--ok"
                      }
                    >
                      {isLow ? "Мало" : "Ок"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RawMaterialTable;
