// src/entities/rawMaterial/ui/RawMaterialOperations.jsx
import React, { useEffect, useState } from "react";
import Input from "../../../shared/ui/Input/Input";
import Button from "../../../shared/ui/Button/Button";
import "./RawMaterialOperations.scss";

const RawMaterialOperations = ({
  materials,
  recipes,
  onIncoming, // приход сырья
  onWithdrawByRecipe, // списание по рецепту (заглушка/позже)
  onSimulateWeight, // весы
  currentWeight,
  userName,
  onAddMaterial, // открыть модалку "Добавить материал"
}) => {
  const safeMaterials = Array.isArray(materials) ? materials : [];
  const safeRecipes = Array.isArray(recipes) ? recipes : [];

  const [activeTab, setActiveTab] = useState("incoming");

  const [incomingMaterialId, setIncomingMaterialId] = useState("");
  const [incomingWeight, setIncomingWeight] = useState("");

  const [recipeId, setRecipeId] = useState("");
  const [recipeMultiplier, setRecipeMultiplier] = useState("1");

  // если есть материалы — по умолчанию выбираем первый
  useEffect(() => {
    if (!incomingMaterialId && safeMaterials.length > 0) {
      setIncomingMaterialId(String(safeMaterials[0].id));
    }
  }, [safeMaterials, incomingMaterialId]);

  const handleSimulate = () => {
    if (typeof onSimulateWeight === "function") {
      const w = onSimulateWeight();
      if (activeTab === "incoming") {
        setIncomingWeight(String(w));
      }
    }
  };

  const handleIncomingSubmit = (e) => {
    if (e) e.preventDefault();

    if (!safeMaterials.length) {
      console.warn("Нет материалов для прихода — список пустой");
      if (typeof onAddMaterial === "function") {
        onAddMaterial();
      }
      return;
    }

    if (!incomingMaterialId) {
      console.warn("Материал не выбран — приход не отправлен");
      return;
    }

    const payload = {
      materialId: incomingMaterialId,
      weight: Number(incomingWeight) || currentWeight || 0,
      userName,
    };

    if (typeof onIncoming === "function") {
      onIncoming(payload);
    }

    setIncomingWeight("");
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    if (!recipeId || typeof onWithdrawByRecipe !== "function") return;

    onWithdrawByRecipe({
      recipeId,
      multiplier: Number(recipeMultiplier) || 1,
      userName,
    });

    setRecipeMultiplier("1");
  };

  const unitLabel = safeMaterials[0]?.unit || "кг";

  return (
    <div className="operations">
      <div className="operations__top">
        <div className="tabs">
          <button
            type="button"
            className={`tab ${activeTab === "incoming" ? "tabActive" : ""}`}
            onClick={() => setActiveTab("incoming")}
          >
            Приход сырья
          </button>
          <button
            type="button"
            className={`tab ${activeTab === "withdrawal" ? "tabActive" : ""}`}
            onClick={() => setActiveTab("withdrawal")}
          >
            Списание по рецепту
          </button>
        </div>

        {typeof onAddMaterial === "function" && (
          <Button type="button" onClick={onAddMaterial}>
            + Добавить материал
          </Button>
        )}
      </div>

      {activeTab === "incoming" && (
        <form className="form" onSubmit={handleIncomingSubmit}>
          <div className="sectionTitle">Поступление сырья</div>
          <div className="row">
            <div className="field">
              <label className="label">Материал</label>
              <select
                className="select"
                value={incomingMaterialId}
                onChange={(e) => setIncomingMaterialId(e.target.value)}
              >
                <option value="">Не выбрано</option>
                {safeMaterials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label className="label">Вес, {unitLabel}</label>
              <Input
                value={incomingWeight}
                onChange={(e) => setIncomingWeight(e.target.value)}
                placeholder="0.0"
              />
              <div className="currentWeight">
                Текущий вес:{" "}
                <span className="weightValue">{currentWeight} кг</span>
                <button
                  type="button"
                  className="simulate"
                  onClick={handleSimulate}
                >
                  Подставить с весов
                </button>
              </div>
            </div>
          </div>

          <div className="actions">
            <Button type="submit">Добавить приход</Button>
          </div>
        </form>
      )}

      {activeTab === "withdrawal" && (
        <form className="form" onSubmit={handleWithdrawSubmit}>
          <div className="sectionTitle">Списание по рецепту</div>
          <div className="row">
            <div className="field">
              <label className="label">Рецепт продукции</label>
              <select
                className="select"
                value={recipeId}
                onChange={(e) => setRecipeId(e.target.value)}
              >
                <option value="">Не выбрано</option>
                {safeRecipes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label className="label">Кол-во изделий (множитель)</label>
              <Input
                value={recipeMultiplier}
                onChange={(e) => setRecipeMultiplier(e.target.value)}
                placeholder="1"
              />
            </div>
          </div>

          <div className="actions">
            <Button type="submit">Списать по рецепту</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RawMaterialOperations;
