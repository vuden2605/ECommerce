import { fetchDashboardData, fetchProducts } from './adminService.js';
import { renderDashboard, renderProducts} from './eventHandle.js';

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchDashboardData();
  
  renderDashboard(data);
  
});
