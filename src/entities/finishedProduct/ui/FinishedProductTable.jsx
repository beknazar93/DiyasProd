import React from "react";
import "./FinishedProductTable.scss";

const FinishedProductTable = ({ products }) => {
  const rows = Array.isArray(products) ? products : [];

  if (!rows.length) {
    return (
      <div className="fp-table">
        <div className="fp-table__empty">
          Пока нет записей по готовой продукции.
        </div>
      </div>
    );
  }

  return (
    <div className="fp-table">
      <div className="fp-table__scroll">
        <table className="fp-table__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Наименование</th>
              <th>Артикул / код</th>
              <th>Ед. изм.</th>
              <th>Остаток</th>
              <th>Резерв</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name || p.title}</td>
                <td>{p.sku || p.code || "—"}</td>
                <td>{p.unit || "шт"}</td>
                <td>{p.quantity ?? p.stock ?? 0}</td>
                <td>{p.reserved_quantity ?? p.reserved ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinishedProductTable;
