import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../widgets/layout/MainLayout";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import RawMaterialPage from "../pages/warehouse/RawMaterialPage";
import FinishedProductPage from "../pages/warehouse/FinishedProductPage";
import ProductionStagesPage from "../pages/production/ProductionStagesPage";
import SalesPage from "../pages/sales/SalesPage";
import LogisticsPage from "../pages/logistics/LogisticsPage";
import AnalyticsPage from "../pages/analytics/AnalyticsPage";
import ReportsPage from "../pages/reports/ReportsPage";
import UserManagementPage from "../pages/users/UserManagementPage";
import QualityControlPage from "../pages/quality/QualityControlPage";
import ProductionControlPage from "../pages/production/ProductionControlPage";
import DeliveryMapPage from "../pages/logistics/DeliveryMapPage";
import CustomerCardPage from "../pages/customers/CustomerCardPage";
import { useAuthStore } from "../shared/store/useAuthStore";

const App = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/warehouse/raw" element={<RawMaterialPage />} />
        <Route path="/warehouse/finished" element={<FinishedProductPage />} />
        <Route path="/production/stages" element={<ProductionStagesPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/logistics" element={<LogisticsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />

        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/quality" element={<QualityControlPage />} />
        <Route path="/production/control" element={<ProductionControlPage />} />
        <Route path="/logistics/map" element={<DeliveryMapPage />} />
        <Route path="/customers/card" element={<CustomerCardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
