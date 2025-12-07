// src/entities/finishedProduct/model/useFinishedProductStore.js
import { create } from "zustand";
import { scladApi } from "../../../shared/api/scladApi";

export const useFinishedProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  async fetchProducts() {
    set({ loading: true, error: null });
    try {
      const res = await scladApi.getFinishedProducts();
      set({ products: res.data || [], loading: false });
    } catch (e) {
      console.error("fetchFinishedProducts error:", e);
      set({ loading: false, error: "Не удалось загрузить готовую продукцию" });
    }
  },

  // приход/расход по остатку
  async changeStock({ productId, delta }) {
    const { products } = get();
    const target = products.find((p) => p.id === productId);
    if (!target) return;

    const current = Number(target.quantity ?? target.stock ?? 0) || 0;
    const next = current + delta;

    try {
      const res = await scladApi.updateFinishedProduct(productId, {
        quantity: next,
      });
      const updated = res.data;
      set({
        products: products.map((p) => (p.id === productId ? updated : p)),
      });
    } catch (e) {
      console.error("changeStock error:", e);
    }
  },
}));
