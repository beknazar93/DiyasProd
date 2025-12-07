import { create } from "zustand";
import {
  MOCK_RAW_MATERIALS,
  MOCK_PRODUCT_RECIPES,
} from "./mockData";

const createEntry = ({
  type,
  materialId,
  materialName,
  weight,
  userName,
  recipeName,
}) => ({
  id: Date.now().toString() + Math.random().toString(16).slice(2),
  type, // "incoming" | "withdrawal"
  materialId,
  materialName,
  weight,
  recipeName: recipeName || null,
  userName: userName || "Оператор",
  createdAt: new Date().toISOString(),
});

export const useRawMaterialStore = create((set, get) => ({
  materials: [...MOCK_RAW_MATERIALS],
  recipes: [...MOCK_PRODUCT_RECIPES],
  entries: [],
  filters: {
    search: "",
    type: "all", // all | incoming | withdrawal
  },
  currentWeight: 0,

  setFilter: (name, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [name]: value,
      },
    }));
  },

  simulateWeight: () => {
    const randomWeight = Math.floor(Math.random() * 50) + 1;
    set({ currentWeight: randomWeight });
    return randomWeight;
  },

  resetFilters: () =>
    set({
      filters: {
        search: "",
        type: "all",
      },
    }),

  // Приход сырья
  addIncoming: ({ materialId, weight, userName }) => {
    const w = Number(weight) || 0;
    if (w <= 0) return;

    set((state) => {
      const materials = state.materials.map((m) =>
        m.id === materialId
          ? { ...m, currentStock: (Number(m.currentStock) || 0) + w }
          : m
      );

      const material = materials.find((m) => m.id === materialId);
      const entry = createEntry({
        type: "incoming",
        materialId,
        materialName: material?.name || "",
        weight: w,
        userName,
      });

      return {
        materials,
        entries: [entry, ...state.entries],
      };
    });
  },

  // Списание по рецепту
  withdrawByRecipe: ({ recipeId, multiplier = 1, userName }) => {
    const { recipes, materials } = get();
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe) return;

    const factor = Number(multiplier) || 1;

    const insufficient = [];
    for (const item of recipe.materials) {
      const needed = item.weight * factor;
      const material = materials.find((m) => m.id === item.materialId);
      const stock = Number(material?.currentStock) || 0;
      if (stock < needed) {
        insufficient.push({
          materialName: item.materialName,
          stock,
          needed,
        });
      }
    }

    if (insufficient.length > 0) {
      console.warn("Недостаточно сырья:", insufficient);
      return;
    }

    set((state) => {
      const updatedMaterials = state.materials.map((m) => {
        const used = recipe.materials.find((rm) => rm.materialId === m.id);
        if (!used) return m;
        const delta = used.weight * factor;
        return {
          ...m,
          currentStock: (Number(m.currentStock) || 0) - delta,
        };
      });

      const newEntries = recipe.materials.map((rm) =>
        createEntry({
          type: "withdrawal",
          materialId: rm.materialId,
          materialName: rm.materialName,
          weight: rm.weight * factor,
          recipeName: recipe.name,
          userName,
        })
      );

      return {
        materials: updatedMaterials,
        entries: [...newEntries, ...state.entries],
      };
    });
  },

  getFilteredEntries: () => {
    const { entries, filters } = get();
    return entries.filter((e) => {
      if (filters.type !== "all" && e.type !== filters.type) return false;
      if (
        filters.search &&
        !String(e.materialName)
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  },

  getSummary: () => {
    const { materials } = get();
    const totalPositions = materials.length;
    const totalQuantity = materials.reduce(
      (sum, m) => sum + (Number(m.currentStock) || 0),
      0
    );
    const lowStockCount = materials.filter(
      (m) =>
        (Number(m.currentStock) || 0) <= (Number(m.minStock) || 0) &&
        m.minStock > 0
    ).length;

    return { totalPositions, totalQuantity, lowStockCount };
  },
}));