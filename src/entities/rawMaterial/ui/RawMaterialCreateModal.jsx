// src/entities/rawMaterial/ui/RawMaterialCreateModal.jsx
import React, { useState } from "react";
import "./RawMaterialCreateModal.scss";
import { useRawMaterialStore } from "../model/useRawMaterialStore";
import Input from "../../../shared/ui/Input/Input";
import Button from "../../../shared/ui/Button/Button";

const materialTypeOptions = [
  { value: "granules", label: "Гранулы" },
  { value: "color", label: "Краситель" },
  { value: "additive", label: "Добавка" },
  { value: "package", label: "Упаковка" },
  { value: "other", label: "Другое" },
];

const unitOptions = [
  { value: "kg", label: "кг" },
  { value: "t", label: "тонны" },
  { value: "l", label: "литры" },
  { value: "pcs", label: "шт" },
];

const RawMaterialCreateModal = ({ onClose }) => {
  const createMaterial = useRawMaterialStore((s) => s.createMaterial);

  const [name, setName] = useState("");
  const [materialType, setMaterialType] = useState("granules");
  const [unit, setUnit] = useState("kg");
  const [minStock, setMinStock] = useState("");
  const [currentStock, setCurrentStock] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Заполни наименование.");
      return;
    }

    const payload = {
      name: name.trim(),
      material_type: materialType, // ← строго один из enum
      unit: unit, // ← строго один из enum
      min_stock: String(minStock || "0"),
      current_stock: String(currentStock || "0"),
    };

    try {
      setSubmitting(true);
      await createMaterial(payload);
      setSubmitting(false);
      if (typeof onClose === "function") onClose();
    } catch (_e) {
      setSubmitting(false);
      setFormError(
        "Не удалось создать материал. Проверь, что тип и ед. измерения выбраны корректно."
      );
    }
  };

  return (
    <div className="rawm-modal">
      <div className="rawm-modal__backdrop" onClick={onClose} />

      <div className="rawm-modal__content">
        <div className="rawm-modal__header">
          <h3 className="rawm-modal__title">Добавить новый материал</h3>
        </div>

        <form className="rawm-modal__form" onSubmit={handleSubmit}>
          <div className="rawm-modal__field">
            <label className="rawm-modal__label">Наименование</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например, Гранула ПСБ-С35"
            />
          </div>

          <div className="rawm-modal__row">
            <div className="rawm-modal__field">
              <label className="rawm-modal__label">Тип сырья</label>
              <select
                className="rawm-modal__select"
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
              >
                {materialTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} ({opt.value})
                  </option>
                ))}
              </select>
            </div>

            <div className="rawm-modal__field">
              <label className="rawm-modal__label">Ед. измерения</label>
              <select
                className="rawm-modal__select"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                {unitOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} ({opt.value})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rawm-modal__row">
            <div className="rawm-modal__field">
              <label className="rawm-modal__label">Минимальный остаток</label>
              <Input
                value={minStock}
                onChange={(e) => setMinStock(e.target.value)}
                placeholder="0"
              />
            </div>

            <div className="rawm-modal__field">
              <label className="rawm-modal__label">Текущий остаток</label>
              <Input
                value={currentStock}
                onChange={(e) => setCurrentStock(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          {formError && <div className="rawm-modal__error">{formError}</div>}

          <div className="rawm-modal__actions">
            <Button type="button" variant="secondary" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Сохраняем..." : "Создать материал"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RawMaterialCreateModal;
