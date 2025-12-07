
import httpClient  from "./httpClient";

// httpClient уже знает baseURL = "https://nurdan954.eu.pythonanywhere.com/api"

export const scladApi = {
  // --- СЫРЬЁ ---

  getRawMaterials(params) {
    return httpClient.get("/sclad/raw-materials/", { params });
  },

  getRawMaterialMovements(params) {
    return httpClient.get("/sclad/raw-materials/movements/", { params });
  },

  createRawMaterialMovement(payload) {
    // payload типично: { raw_material: 1, type: "incoming", quantity: 12.5 }
    return httpClient.post("/sclad/raw-materials/movements/", payload);
  },

  // --- ГОТОВАЯ ПРОДУКЦИЯ ---

  getFinishedProducts(params) {
    return httpClient.get("/sclad/finished-products/", { params });
  },

  createFinishedProduct(payload) {
    return httpClient.post("/sclad/finished-products/", payload);
  },

  updateFinishedProduct(id, payload) {
    return httpClient.put(`/sclad/finished-products/${id}/`, payload);
  },

  deleteFinishedProduct(id) {
    return httpClient.delete(`/sclad/finished-products/${id}/`);
  },
};
