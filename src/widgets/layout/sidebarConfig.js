// роли подгони под свои значения из backend (system_role)
export const ROLES = {
    ADMIN: "admin",
    WAREHOUSE: "warehouse",
    PRODUCTION: "production",
    LOGISTICS: "logistics",
  };
  
  export const SIDEBAR_ITEMS = [
    {
      id: "dashboard",
      label: "Дашборд",
      path: "/dashboard",
      roles: [ROLES.ADMIN, ROLES.WAREHOUSE, ROLES.PRODUCTION, ROLES.LOGISTICS],
    },
    {
      id: "raw-material",
      label: "Склад сырья",
      path: "/warehouse/raw",
      roles: [ROLES.ADMIN, ROLES.WAREHOUSE],
    },
    {
      id: "finished-product",
      label: "Готовая продукция",
      path: "/warehouse/finished",
      roles: [ROLES.ADMIN, ROLES.WAREHOUSE],
    },
    {
      id: "logistics",
      label: "Логистика",
      path: "/logistics/shipments",
      roles: [ROLES.ADMIN, ROLES.LOGISTICS],
    },
    // и т.д. по модулям
  ];
  