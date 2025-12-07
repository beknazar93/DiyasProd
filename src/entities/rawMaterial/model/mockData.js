// src/entities/rawMaterial/model/mockData.js

// Моковые материалы (на основе RawMaterialWarehouse.tsx из figma)
export const MOCK_RAW_MATERIALS = [
  {
    id: "1",
    name: "ПВХ гранулы",
    type: "Основное сырье",
    unit: "кг",
    currentStock: 150,
    minStock: 200,
  },
  {
    id: "2",
    name: "Полиэтилен высокой плотности",
    type: "Основное сырье",
    unit: "кг",
    currentStock: 450,
    minStock: 300,
  },
  {
    id: "3",
    name: "Полипропилен",
    type: "Основное сырье",
    unit: "кг",
    currentStock: 320,
    minStock: 250,
  },
  {
    id: "4",
    name: "Краситель красный",
    type: "Добавка",
    unit: "кг",
    currentStock: 25,
    minStock: 15,
  },
  {
    id: "5",
    name: "Краситель синий",
    type: "Добавка",
    unit: "кг",
    currentStock: 8,
    minStock: 10,
  },
  {
    id: "6",
    name: "Стабилизатор UV",
    type: "Добавка",
    unit: "кг",
    currentStock: 42,
    minStock: 20,
  },
  {
    id: "7",
    name: "Пластификатор",
    type: "Добавка",
    unit: "л",
    currentStock: 65,
    minStock: 40,
  },
  {
    id: "8",
    name: "Антиоксидант",
    type: "Добавка",
    unit: "кг",
    currentStock: 18,
    minStock: 12,
  },
];

// Рецепты продукции (основано на productRecipes из figma RawMaterialWarehouse.tsx)
export const MOCK_PRODUCT_RECIPES = [
  {
    id: "1",
    name: "Пластиковая труба ПВХ 50мм",
    materials: [
      { materialId: "1", materialName: "ПВХ гранулы", weight: 20 },
      { materialId: "6", materialName: "Стабилизатор UV", weight: 2 },
      { materialId: "7", materialName: "Пластификатор", weight: 1.5 },
    ],
  },
  {
    id: "2",
    name: "Контейнер пластиковый 5л (красный)",
    materials: [
      {
        materialId: "2",
        materialName: "Полиэтилен высокой плотности",
        weight: 15,
      },
      { materialId: "4", materialName: "Краситель красный", weight: 0.5 },
      { materialId: "8", materialName: "Антиоксидант", weight: 0.3 },
    ],
  },
  {
    id: "3",
    name: "Контейнер пластиковый 5л (синий)",
    materials: [
      {
        materialId: "2",
        materialName: "Полиэтилен высокой плотности",
        weight: 15,
      },
      { materialId: "5", materialName: "Краситель синий", weight: 0.5 },
      { materialId: "8", materialName: "Антиоксидант", weight: 0.3 },
    ],
  },
  {
    id: "4",
    name: "Крышка для контейнера",
    materials: [
      { materialId: "3", materialName: "Полипропилен", weight: 8 },
      { materialId: "6", materialName: "Стабилизатор UV", weight: 0.5 },
    ],
  },
];