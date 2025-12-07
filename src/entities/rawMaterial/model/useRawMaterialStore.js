// src/entities/rawMaterial/model/useRawMaterialStore.js
import { create } from "zustand";
import { scladApi } from "../../../shared/api/scladApi";

export const useRawMaterialStore = create((set, get) => ({
  materials: [],
  movements: [],
  loading: false,
  error: null,

  // можно потом добавить фильтры по дате/типу/оператору
  filters: {
    type: "all", // all | incoming | outgoing
  },

  // загрузить всё для страницы склада сырья
  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const [matRes, movRes] = await Promise.all([
        scladApi.getRawMaterials(),
        scladApi.getRawMaterialMovements(),
      ]);

      set({
        materials: matRes.data || [],
        movements: movRes.data || [],
        loading: false,
      });
    } catch (e) {
      console.error("fetchAll raw materials error:", e);
      set({
        loading: false,
        error: "Не удалось загрузить данные склада сырья",
      });
    }
  },

  // приход сырья (используется в RawMaterialOperations)
  addIncoming: async ({ materialId, weight }) => {
    try {
      const payload = {
        raw_material: materialId,
        type: "incoming", // как у тебя называется в DRF: incoming/in, etc
        quantity: weight,
      };
      const res = await scladApi.createRawMaterialMovement(payload);

      // докидываем в список движений
      const newMovement = res.data;
      set((state) => ({
        movements: [newMovement, ...state.movements],
      }));

      // для простоты – запрашиваем остатки заново
      const mats = await scladApi.getRawMaterials();
      set({ materials: mats.data || [] });
    } catch (e) {
      console.error("addIncoming error:", e);
    }
  },

  // списание по рецепту (бутылки/изделия → сырье)
  withdrawByRecipe: async ({ materialId, weight }) => {
    try {
      const payload = {
        raw_material: materialId,
        type: "outgoing", // или "consumption" – подгони под бекенд
        quantity: weight,
      };
      const res = await scladApi.createRawMaterialMovement(payload);

      const newMovement = res.data;
      set((state) => ({
        movements: [newMovement, ...state.movements],
      }));

      const mats = await scladApi.getRawMaterials();
      set({ materials: mats.data || [] });
    } catch (e) {
      console.error("withdrawByRecipe error:", e);
    }
  },

  // история с учётом фильтров
  getFilteredEntries: () => {
    const { movements, filters } = get();
    if (filters.type === "all") return movements;

    return movements.filter((m) => {
      const t = m.type || m.operation_type;
      if (!t) return false;
      if (filters.type === "incoming") {
        return t === "incoming" || t === "in";
      }
      if (filters.type === "outgoing") {
        return t === "outgoing" || t === "consumption" || t === "out";
      }
      return true;
    });
  },

  // мини-аггрегации по складу
  getSummary: () => {
    const { materials } = get();
    const totalPositions = materials.length;
    let totalQuantity = 0;
    let lowStockCount = 0;

    materials.forEach((m) => {
      const current = Number(m.current_quantity ?? m.quantity ?? 0);
      const min = Number(m.min_quantity ?? 0);

      totalQuantity += current;
      if (min > 0 && current <= min) {
        lowStockCount += 1;
      }
    });

    return {
      totalPositions,
      totalQuantity,
      lowStockCount,
    };
  },
}));
