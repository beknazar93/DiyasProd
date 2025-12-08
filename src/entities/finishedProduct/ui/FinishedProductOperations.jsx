import React, { useState } from "react";
import Input from "../../../shared/ui/Input/Input";
import Button from "../../../shared/ui/Button/Button";
import "./FinishedProductOperations.scss";

const FinishedProductOperations = ({ products, onChangeStock }) => {
  const [mode, setMode] = useState("incoming"); // incoming | outgoing
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("");

  const product = products.find((p) => String(p.id) === String(productId));
  const unit = product?.unit || "шт";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productId) return;

    const q = Number(qty || 0) || 0;
    const delta = mode === "incoming" ? q : -q;

    onChangeStock({
      productId: Number(productId),
      delta,
    });

    setQty("");
  };

  return (
    <div className="fp-ops">
      <div className="fp-ops__tabs">
        <button
          className={`fp-ops__tab ${
            mode === "incoming" ? "fp-ops__tab--active" : ""
          }`}
          type="button"
          onClick={() => setMode("incoming")}
        >
          Приход готовой продукции
        </button>
        <button
          className={`fp-ops__tab ${
            mode === "outgoing" ? "fp-ops__tab--active" : ""
          }`}
          type="button"
          onClick={() => setMode("outgoing")}
        >
          Расход (отгрузка клиенту)
        </button>
      </div>

      <form className="fp-ops__form" onSubmit={handleSubmit}>
        <div className="fp-ops__row">
          <div className="fp-ops__field">
            <label className="fp-ops__label">Изделие</label>
            <select
              className="fp-ops__select"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            >
              <option value="">Не выбрано</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name || p.title}
                </option>
              ))}
            </select>
          </div>

          <div className="fp-ops__field">
            <label className="fp-ops__label">Кол-во ({unit})</label>
            <Input
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="fp-ops__actions">
          <Button type="submit">
            {mode === "incoming" ? "Добавить на склад" : "Списать со склада"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FinishedProductOperations;
