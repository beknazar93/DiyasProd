# Маппинг ERP-компонентов в FSD-структуру

Из исходного проекта **"ERP система для производства"** компоненты разложены по слоям так:

- `Dashboard.tsx` → `src/pages/dashboard/DashboardPage`
- `RawMaterialWarehouse.tsx` → `src/pages/warehouse/RawMaterialPage`
- `FinishedProductWarehouse.tsx` → `src/pages/warehouse/FinishedProductPage`
- `ProductionStages.tsx` → `src/pages/production/ProductionStagesPage`
- `SalesDepartment.tsx` → `src/pages/sales/SalesPage`
- `LogisticsManagement.tsx` → `src/pages/logistics/LogisticsPage`
- `Analytics.tsx` → `src/pages/analytics/AnalyticsPage`
- `Reports.tsx` → `src/pages/reports/ReportsPage`
- `UserManagement.tsx` → `src/pages/users/UserManagementPage`
- `QualityControl.tsx` → `src/pages/quality/QualityControlPage`
- `ProductionControl.tsx` → `src/pages/production/ProductionControlPage`
- `DeliveryMap.tsx` → `src/pages/logistics/DeliveryMapPage`
- `CustomerCard.tsx` → `src/pages/customers/CustomerCardPage`

Сейчас страницы содержат базовую разметку-заглушку и готовы для переноса логики 1:1 из TSX-файлов.