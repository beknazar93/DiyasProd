// src/entities/rawMaterial/model/useRawMaterialStore.js
import { create } from "zustand";
import { scladApi } from "../../../shared/api/scladApi";

export const useRawMaterialStore = create((set, get) => ({
  materials: [],
  movements: [],
  loading: false,
  error: null,

  // ===== ЗАГРУЗКА ВСЕГО СКЛАДА СЫРЬЯ =====
  async fetchAll() {
    set({ loading: true, error: null });
    try {
      const [materials, movements] = await Promise.all([
        scladApi.getRawMaterials(),
        scladApi.getRawMaterialMovements(),
      ]);

      set({
        materials,
        movements,
        loading: false,
      });
    } catch (err) {
      console.error("fetchAll raw materials error:", err.response?.data || err);
      set({
        error: "Не удалось загрузить склад сырья.",
        loading: false,
      });
    }
  },

  // ===== СОЗДАНИЕ НОВОГО МАТЕРИАЛА =====
  async createMaterial(payload) {
    // payload:
    // {
    //   name,
    //   material_type: 'granules' | 'color' | 'additive' | 'package' | 'other',
    //   unit: 'kg' | 't' | 'l' | 'pcs',
    //   min_stock: '10.0',
    //   current_stock: '12.0'
    // }
    set({ loading: true, error: null });
    try {
      const material = await scladApi.createRawMaterial(payload);

      set((state) => ({
        materials: [...state.materials, material],
        loading: false,
      }));

      return material;
    } catch (err) {
      console.error("createMaterial error:", err.response?.data || err);
      set({
        error: "Не удалось создать материал.",
        loading: false,
      });
      throw err;
    }
  },

  // ===== ПРИХОД СЫРЬЯ =====
  async addIncoming({ materialId, weight, userName }) {
    const material = Number(materialId);
    const quantity = Number(weight);

    if (!material || Number.isNaN(quantity) || quantity <= 0) {
      console.warn("addIncoming: некорректные данные", {
        materialId,
        weight,
      });
      throw new Error("INVALID_LOCAL_DATA");
    }

    set({ loading: true, error: null });

    try {
      // создаём движение
      const movement = await scladApi.createRawMaterialMovement({
        material,
        operation_type: "in",
        quantity, // scladApi сам приведёт к строке
        document: `Приход ERP (${userName || "неизвестно"})`,
      });

      // перезагружаем склад и движения
      const [materials, movements] = await Promise.all([
        scladApi.getRawMaterials(),
        scladApi.getRawMaterialMovements(),
      ]);

      set({
        materials,
        movements,
        loading: false,
      });

      return movement;
    } catch (err) {
      console.error("addIncoming error (server):", err.response?.data || err);
      set({
        error: "Не удалось провести приход. Проверьте количество и материал.",
        loading: false,
      });
      throw err;
    }
  },

  // ===== СВОДКА ПО СКЛАДУ =====
  getSummary() {
    const { materials } = get();

    const totalPositions = materials.length;
    const totalQuantity = materials.reduce(
      (sum, m) => sum + Number(m.current_stock || 0),
      0
    );
    const lowStockCount = materials.filter((m) => {
      const min = Number(m.min_stock || 0);
      const cur = Number(m.current_stock || 0);
      return min > 0 && cur <= min;
    }).length;

    return {
      totalPositions,
      totalQuantity,
      lowStockCount,
    };
  },

  // ===== СТАРЫЙ getFilteredEntries (чтобы не падали компоненты) =====
  getFilteredEntries() {
    // Сейчас без фильтров — просто весь список движений
    const { movements } = get();
    return Array.isArray(movements) ? movements : [];
  },
}));
