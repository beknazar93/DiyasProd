import React, { useState } from "react";
import "./RawMaterialInvoiceForm.scss";
import Input from "../../../shared/ui/Input/Input";
import Button from "../../../shared/ui/Button/Button";

const makeEmptyRow = () => ({
  materialId: "",
  quantity: "",
  unitPrice: "",
  comment: "",
});

const RawMaterialInvoiceForm = ({ materials, onSubmit }) => {
  const [header, setHeader] = useState({
    number: "",
    date: new Date().toISOString().slice(0, 10),
    supplier: "",
    comment: "",
  });

  const [rows, setRows] = useState([makeEmptyRow()]);

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeader((prev) => ({ ...prev, [name]: value }));
  };

  const handleRowChange = (index, field, value) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const addRow = () => {
    setRows((prev) => [...prev, makeEmptyRow()]);
  };

  const removeRow = (index) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const preparedRows = rows
      .filter((r) => r.materialId && r.quantity)
      .map((r) => ({
        materialId: Number(r.materialId),
        quantity: Number(r.quantity) || 0,
        unitPrice: Number(r.unitPrice) || 0,
        comment: r.comment || "",
      }));

    if (!preparedRows.length) return;

    onSubmit({
      ...header,
      rows: preparedRows,
    });

    // можно очистить форму, если нужно
    // setRows([makeEmptyRow()]);
  };

  return (
    <div className="rm-invoice">
      <div className="rm-invoice__header">
        <h3 className="rm-invoice__title">Накладная на сырьё (гранула)</h3>
        <p className="rm-invoice__subtitle">
          Документ прихода сырья. По строкам создаются движения по складу.
        </p>
      </div>

      <form className="rm-invoice__form" onSubmit={handleSubmit}>
        <div className="rm-invoice__top">
          <div className="rm-invoice__field">
            <label className="rm-invoice__label">№ накладной</label>
            <Input
              name="number"
              value={header.number}
              onChange={handleHeaderChange}
              placeholder="Например, 15/12-01"
            />
          </div>

          <div className="rm-invoice__field">
            <label className="rm-invoice__label">Дата</label>
            <input
              type="date"
              name="date"
              className="rm-invoice__date"
              value={header.date}
              onChange={handleHeaderChange}
            />
          </div>

          <div className="rm-invoice__field rm-invoice__field--wide">
            <label className="rm-invoice__label">Поставщик</label>
            <Input
              name="supplier"
              value={header.supplier}
              onChange={handleHeaderChange}
              placeholder="Название компании / ФИО"
            />
          </div>
        </div>

        <div className="rm-invoice__rows">
          <div className="rm-invoice__row rm-invoice__row--head">
            <div className="rm-invoice__cell rm-invoice__cell--index">№</div>
            <div className="rm-invoice__cell rm-invoice__cell--material">
              Материал
            </div>
            <div className="rm-invoice__cell rm-invoice__cell--qty">Кол-во</div>
            <div className="rm-invoice__cell rm-invoice__cell--price">
              Цена за ед.
            </div>
            <div className="rm-invoice__cell rm-invoice__cell--amount">
              Сумма
            </div>
            <div className="rm-invoice__cell rm-invoice__cell--comment">
              Комментарий
            </div>
            <div className="rm-invoice__cell rm-invoice__cell--actions" />
          </div>

          {rows.map((row, index) => {
            const material = materials.find(
              (m) => String(m.id) === String(row.materialId)
            );
            const unit = material?.unit || "кг";

            const qtyNum = Number(row.quantity) || 0;
            const priceNum = Number(row.unitPrice) || 0;
            const amount = qtyNum * priceNum;

            return (
              <div className="rm-invoice__row" key={index}>
                <div className="rm-invoice__cell rm-invoice__cell--index">
                  {index + 1}
                </div>

                <div className="rm-invoice__cell rm-invoice__cell--material">
                  <select
                    className="rm-invoice__select"
                    value={row.materialId}
                    onChange={(e) =>
                      handleRowChange(index, "materialId", e.target.value)
                    }
                  >
                    <option value="">Не выбрано</option>
                    {materials.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rm-invoice__cell rm-invoice__cell--qty">
                  <Input
                    value={row.quantity}
                    onChange={(e) =>
                      handleRowChange(index, "quantity", e.target.value)
                    }
                    placeholder={`0.0 ${unit}`}
                  />
                </div>

                <div className="rm-invoice__cell rm-invoice__cell--price">
                  <Input
                    value={row.unitPrice}
                    onChange={(e) =>
                      handleRowChange(index, "unitPrice", e.target.value)
                    }
                    placeholder="0.0"
                  />
                </div>

                <div className="rm-invoice__cell rm-invoice__cell--amount">
                  {amount ? amount.toLocaleString("ru-RU") : "—"}
                </div>

                <div className="rm-invoice__cell rm-invoice__cell--comment">
                  <Input
                    value={row.comment}
                    onChange={(e) =>
                      handleRowChange(index, "comment", e.target.value)
                    }
                    placeholder="Комментарий к строке"
                  />
                </div>

                <div className="rm-invoice__cell rm-invoice__cell--actions">
                  {rows.length > 1 && (
                    <button
                      type="button"
                      className="rm-invoice__remove"
                      onClick={() => removeRow(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="rm-invoice__footer">
          <button
            type="button"
            className="rm-invoice__add-row"
            onClick={addRow}
          >
            + Добавить строку
          </button>

          <div className="rm-invoice__comment-block">
            <label className="rm-invoice__label">
              Комментарий по документу
            </label>
            <textarea
              name="comment"
              className="rm-invoice__textarea"
              value={header.comment}
              onChange={handleHeaderChange}
              rows={2}
            />
          </div>

          <Button type="submit">Провести накладную</Button>
        </div>
      </form>
    </div>
  );
};

export default RawMaterialInvoiceForm;
