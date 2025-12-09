import React, { useState } from "react";
import "./RawMaterialCreateModal.scss";
import Input from "../../../shared/ui/Input/Input";
import Button from "../../../shared/ui/Button/Button";
import { useRawMaterialStore } from "../model/useRawMaterialStore";

const MATERIAL_TYPE_OPTIONS = [
  { value: "granules", label: "ПВХ гранулы" },
  { value: "color", label: "Краситель" },
  { value: "additive", label: "Добавка" },
  { value: "package", label: "Упаковка" },
  { value: "other", label: "Другое" },
];

const UNIT_OPTIONS = [
  { value: "kg", label: "кг" },
  { value: "t", label: "т" },
  { value: "l", label: "л" },
  { value: "pcs", label: "шт" },
];

const RawMaterialCreateModal = ({ onClose }) => {
  const createMaterial = useRawMaterialStore((s) => s.createMaterial);

  const [name, setName] = useState("");
  const [materialType, setMaterialType] = useState("granules");
  const [unit, setUnit] = useState("kg");
  const [quantity, setQuantity] = useState("0");
  const [minStock, setMinStock] = useState("0");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Укажите название материала");
      return;
    }

    try {
      setSaving(true);

      await createMaterial({
        name: name.trim(),
        material_type: materialType,
        unit,
        min_stock: minStock || "0",
        current_stock: quantity || "0",
      });

      onClose();
    } catch (err) {
      console.error("createMaterial error:", err);
      setError(
        "Не удалось создать материал. Проверьте значения и попробуйте ещё раз."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rawm-modal">
      <div className="rawm-modal__backdrop" onClick={onClose} />

      <div className="rawm-modal__window">
        <h2 className="rawm-modal__title">Добавить материал</h2>

        <form className="rawm-modal__form" onSubmit={handleSubmit}>
          <label className="rawm-modal__field">
            <span className="rawm-modal__label">Название</span>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например, ПВХ гранулы белые"
            />
          </label>

          <label className="rawm-modal__field">
            <span className="rawm-modal__label">Тип</span>
            <select
              className="rawm-modal__select"
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
            >
              {MATERIAL_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          <div className="rawm-modal__grid">
            <label className="rawm-modal__field">
              <span className="rawm-modal__label">Количество</span>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </label>

            <label className="rawm-modal__field">
              <span className="rawm-modal__label">Ед. измерения</span>
              <select
                className="rawm-modal__select"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                {UNIT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="rawm-modal__field">
            <span className="rawm-modal__label">Минимальный остаток</span>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={minStock}
              onChange={(e) => setMinStock(e.target.value)}
            />
          </label>

          {error && <div className="rawm-modal__error">{error}</div>}

          <div className="rawm-modal__actions">
            <Button type="submit" disabled={saving}>
              {saving ? "Сохранение..." : "Добавить"}
            </Button>
            <button
              type="button"
              className="rawm-modal__btn-secondary"
              onClick={onClose}
              disabled={saving}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RawMaterialCreateModal;
