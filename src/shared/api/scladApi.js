// src/shared/api/scladApi.js
import httpClient from "./httpClient";

// httpClient уже настроен на baseURL = "https://nurdan954.eu.pythonanywhere.com/api"
// и автоматически подставляет Authorization: Bearer <access>

export const scladApi = {
  // --- СЫРЬЁ ---

  getRawMaterials(params) {
    return httpClient.get("/sclad/raw-materials/", { params });
  },

  getRawMaterialMovements(params) {
    return httpClient.get("/sclad/raw-materials/movements/", { params });
  },

  createRawMaterialMovement(payload) {
    // ожидаем, что на бэке есть что-то вроде:
    // { raw_material, type: "incoming" | "withdrawal", quantity }
    return httpClient.post("/sclad/raw-materials/movements/", payload);
  },

  // --- ГОТОВАЯ ПРОДУКЦИЯ ---

  getFinishedProducts(params) {
    return httpClient.get("/sclad/finished-products/", { params });
  },

  createFinishedProduct(payload) {
    return httpClient.post("/sclad/finished-products/", payload);
  },

  // PATCH — чтобы можно было отправлять только quantity
  updateFinishedProduct(id, payload) {
    return httpClient.patch(`/sclad/finished-products/${id}/`, payload);
  },

  deleteFinishedProduct(id) {
    return httpClient.delete(`/sclad/finished-products/${id}/`);
  },
};
