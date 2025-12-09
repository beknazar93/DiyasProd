import React from "react";
import "./RawMaterialTable.scss";

const RawMaterialTable = ({ materials }) => {
  const rows = Array.isArray(materials) ? materials : [];

  const formatQty = (value, unit = "кг") => {
    if (value === null || value === undefined) return "-";
    const num = Number(value);
    if (Number.isNaN(num)) return `${value} ${unit}`;
    return `${num} ${unit}`;
  };

  if (!rows.length) {
    return (
      <div className="rawm-table rawm-table--empty">
        <p className="rawm-table__empty">Пока нет записей по сырью.</p>
      </div>
    );
  }

  return (
    <div className="rawm-table">
      <table className="rawm-table__inner">
        <thead>
          <tr>
            <th>Название</th>
            <th>Тип</th>
            <th>Количество</th>
            <th>Мин. остаток</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.material_type}</td>
              <td>{formatQty(m.current_stock, m.unit)}</td>
              <td>{formatQty(m.min_stock, m.unit)}</td>
              <td>
                <span
                  className={
                    "rawm-table__status" +
                    (m.status === "low" ? " rawm-table__status--low" : "")
                  }
                >
                  {m.status === "low" ? "Низкий остаток" : "Норма"}
                </span>
              </td>
              <td>
                <button
                  type="button"
                  className="rawm-table__link"
                  onClick={() => {
                    // тут потом можно будет навесить реальное "Взвесить"
                    console.log("Взвесить материал", m.id);
                  }}
                >
                  ⚖️ Взвесить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RawMaterialTable;
