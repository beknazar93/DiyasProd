// src/entities/rawMaterial/ui/RawMaterialAddModal.jsx
import React, { useState } from "react";
import Input from "../../../shared/ui/Input/Input";
import Button from "../../../shared/ui/Button/Button";
import "./RawMaterialAddModal.scss";

const RawMaterialAddModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("кг");
  const [minQuantity, setMinQuantity] = useState("0");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      name: name.trim(),
      unit: unit.trim() || "кг",
      minQuantity: Number(minQuantity) || 0,
    };

    if (typeof onSave === "function") {
      onSave(payload);
    }

    // очищаем форму
    setName("");
    setUnit("кг");
    setMinQuantity("0");
  };

  return (
    <div className="rawm-modal-backdrop" onClick={onClose}>
      <div className="rawm-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="rawm-modal__title">Добавить новый материал</h3>

        <form className="rawm-modal__form" onSubmit={handleSubmit}>
          <div className="rawm-modal__field">
            <label className="rawm-modal__label">Название материала</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например, Гранула ПСБ-С 25"
            />
          </div>

          <div className="rawm-modal__field">
            <label className="rawm-modal__label">Ед. измерения</label>
            <Input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="кг / т / м³"
            />
          </div>

          <div className="rawm-modal__field">
            <label className="rawm-modal__label">Минимальный остаток</label>
            <Input
              value={minQuantity}
              onChange={(e) => setMinQuantity(e.target.value)}
              placeholder="0"
            />
          </div>

          <div className="rawm-modal__actions">
            <Button
              type="button"
              className="rawm-modal__btn rawm-modal__btn--secondary"
              onClick={onClose}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="rawm-modal__btn rawm-modal__btn--primary"
            >
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RawMaterialAddModal;
