import React, { useState } from "react";
import Input from "../../../shared/ui/Input/Input";
import Button from "../../../shared/ui/Button/Button";
import "./RawMaterialOperations.scss";

const RawMaterialOperations = ({
  materials,
  recipes,
  onIncoming,
  onWithdrawByRecipe,
  onSimulateWeight,
  currentWeight,
  userName,
}) => {
  const [activeTab, setActiveTab] = useState("incoming");

  const [incomingMaterialId, setIncomingMaterialId] = useState("");
  const [incomingWeight, setIncomingWeight] = useState("");

  const [recipeId, setRecipeId] = useState("");
  const [recipeMultiplier, setRecipeMultiplier] = useState("1");

  const handleSimulate = () => {
    const w = onSimulateWeight();
    if (activeTab === "incoming") {
      setIncomingWeight(String(w));
    }
  };

  const handleIncomingSubmit = (e) => {
    e.preventDefault();
    if (!incomingMaterialId) return;
    onIncoming({
      materialId: incomingMaterialId,
      weight: Number(incomingWeight) || currentWeight || 0,
      userName,
    });
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    if (!recipeId) return;
    onWithdrawByRecipe({
      recipeId,
      multiplier: Number(recipeMultiplier) || 1,
      userName,
    });
  };

  return (
    <div className="operations">
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
                {materials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="label">Вес, {materials[0]?.unit || "кг"}</label>
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
                {recipes.map((r) => (
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
