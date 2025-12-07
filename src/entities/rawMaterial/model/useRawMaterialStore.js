// src/entities/rawMaterial/model/useRawMaterialStore.js
import { create } from "zustand";
import { scladApi } from "../../../shared/api/scladApi";

export const useRawMaterialStore = create((set, get) => ({
  materials: [],
  movements: [],
  loading: false,
  error: null,

  async fetchMaterials() {
    set({ loading: true, error: null });
    try {
      const res = await scladApi.getRawMaterials();
      set({ materials: res.data || [], loading: false });
    } catch (e) {
      console.error("fetchMaterials error:", e);
      set({ loading: false, error: "Не удалось загрузить сырьё" });
    }
  },

  async fetchMovements(params) {
    try {
      const res = await scladApi.getRawMaterialMovements(params);
      set({ movements: res.data || [] });
    } catch (e) {
      console.error("fetchMovements error:", e);
    }
  },

  // Приход сырья
  async addIncoming({ materialId, weight }) {
    if (!materialId || !weight) return;

    try {
      await scladApi.createRawMaterialMovement({
        raw_material: materialId,
        type: "incoming",
        quantity: weight,
      });

      // после удачного поста — перезагружаем остатки и движения
      await Promise.all([
        get().fetchMaterials(),
        get().fetchMovements(),
      ]);
    } catch (e) {
      console.error("addIncoming error:", e);
    }
  },

  // Списание по рецепту (расход)
  async withdrawByRecipe({ materialId, weight }) {
    if (!materialId || !weight) return;

    try {
      await scladApi.createRawMaterialMovement({
        raw_material: materialId,
        type: "withdrawal",
        quantity: weight,
      });

      await Promise.all([
        get().fetchMaterials(),
        get().fetchMovements(),
      ]);
    } catch (e) {
      console.error("withdrawByRecipe error:", e);
    }
  },
}));
