// src/shared/api/scladApi.js
import httpClient from "./httpClient";

// ВСЕ запросы к /sclad/* вынесены сюда
export const scladApi = {
  // ===== СЫРЬЁ =====
  async getRawMaterials() {
    const res = await httpClient.get("/sclad/raw-materials/");
    return res.data;
  },

  async createRawMaterial(payload) {
    // payload:
    // {
    //   name: "Гранула ПСБ-С35",
    //   material_type: "granules",      // один из [granules, color, additive, package, other]
    //   unit: "kg",                     // один из [kg, t, l, pcs]
    //   min_stock: "0",
    //   current_stock: "0"
    // }
    const res = await httpClient.post("/sclad/raw-materials/", payload);
    return res.data;
  },

  // ===== ДВИЖЕНИЯ СЫРЬЯ =====
  async getRawMaterialMovements() {
    const res = await httpClient.get("/sclad/raw-materials/movements/");
    return res.data;
  },

  async createRawMaterialMovement({ material, operation_type, quantity, document }) {
    const body = {
      material,                        // integer (id сырья)
      operation_type,                  // 'in' | 'out'
      quantity: String(quantity),      // decimal как строка
    };

    if (document) {
      body.document = document.slice(0, 255);
    }

    const res = await httpClient.post("/sclad/raw-materials/movements/", body);
    return res.data;
  },
};
