import { create } from "zustand";
import { scladApi } from "../../../shared/api/scladApi";

export const useFinishedProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await scladApi.getFinishedProducts();
      set({ products: res.data || [], loading: false });
    } catch (e) {
      console.error("fetchProducts finished error:", e);
      set({
        loading: false,
        error: "Не удалось загрузить склад готовой продукции",
      });
    }
  },

  createProduct: async (payload) => {
    try {
      const res = await scladApi.createFinishedProduct(payload);
      const created = res.data;
      set((state) => ({
        products: [created, ...state.products],
      }));
    } catch (e) {
      console.error("createProduct error:", e);
    }
  },

  updateProduct: async (id, payload) => {
    try {
      const res = await scladApi.updateFinishedProduct(id, payload);
      const updated = res.data;
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? updated : p)),
      }));
    } catch (e) {
      console.error("updateProduct error:", e);
    }
  },

  deleteProduct: async (id) => {
    try {
      await scladApi.deleteFinishedProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
    } catch (e) {
      console.error("deleteProduct error:", e);
    }
  },
}));
