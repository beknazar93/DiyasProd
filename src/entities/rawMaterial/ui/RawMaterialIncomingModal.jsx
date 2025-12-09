import React, { useEffect, useState } from "react";
import Input from "../../../shared/ui/Input/Input";
import Button from "../../../shared/ui/Button/Button";
import "./RawMaterialIncomingModal.scss";

const RawMaterialIncomingModal = ({
  open,
  onClose,
  materials,
  userName,
  defaultMaterialId,
  defaultWeight,
  onConfirm,
}) => {
  if (!open) return null;

  const safeMaterials = Array.isArray(materials) ? materials : [];

  const [materialId, setMaterialId] = useState(defaultMaterialId || "");
  const [weight, setWeight] = useState(
    defaultWeight != null ? String(defaultWeight) : ""
  );
  const [comment, setComment] = useState("");

  useEffect(() => {
    setMaterialId(defaultMaterialId || "");
    setWeight(defaultWeight != null ? String(defaultWeight) : "");
  }, [defaultMaterialId, defaultWeight, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!materialId || typeof onConfirm !== "function") return;

    await onConfirm({
      materialId,
      weight: Number(weight) || 0,
      userName,
      comment,
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const unitLabel =
    safeMaterials.find((m) => String(m.id) === String(materialId))?.unit ||
    safeMaterials[0]?.unit ||
    "кг";

  return (
    <div className="rm-incoming-modal" onClick={handleOverlayClick}>
      <div className="rm-incoming-modal__content">
        <div className="rm-incoming-modal__header">
          <h3 className="rm-incoming-modal__title">Новый приход сырья</h3>
          <button
            type="button"
            className="rm-incoming-modal__close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form className="rm-incoming-modal__form" onSubmit={handleSubmit}>
          <div className="rm-incoming-modal__body">
            <div className="rm-incoming-modal__field">
              <label className="rm-incoming-modal__label">Материал</label>
              <select
                className="rm-incoming-modal__select"
                value={materialId}
                onChange={(e) => setMaterialId(e.target.value)}
              >
                <option value="">Не выбрано</option>
                {safeMaterials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="rm-incoming-modal__field">
              <label className="rm-incoming-modal__label">
                Вес, {unitLabel}
              </label>
              <Input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0.0"
              />
            </div>

            <div className="rm-incoming-modal__field">
              <label className="rm-incoming-modal__label">Комментарий</label>
              <textarea
                className="rm-incoming-modal__textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Например: Накладная №123 от 01.12"
              />
            </div>

            <div className="rm-incoming-modal__meta">
              <span className="rm-incoming-modal__meta-label">
                Ответственный:
              </span>
              <span className="rm-incoming-modal__meta-value">{userName}</span>
            </div>
          </div>

          <div className="rm-incoming-modal__footer">
            <button
              type="button"
              className="rm-incoming-modal__btn rm-incoming-modal__btn--secondary"
              onClick={onClose}
            >
              Отмена
            </button>
            <Button type="submit">Сохранить приход</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RawMaterialIncomingModal;
