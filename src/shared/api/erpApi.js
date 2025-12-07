import http from './httpClient';

export const erpApi = {
  getDashboard: () => http.get('/erp/dashboard/'),
  getRawMaterials: (params) => http.get('/erp/raw-materials/', { params }),
  getFinishedProducts: (params) => http.get('/erp/finished-products/', { params }),
  getProductionStages: (params) => http.get('/erp/production-stages/', { params }),
  getSales: (params) => http.get('/erp/sales/', { params }),
  getLogistics: (params) => http.get('/erp/logistics/', { params }),
  getAnalytics: (params) => http.get('/erp/analytics/', { params }),
};