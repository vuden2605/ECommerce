import { fetchDashboardData, fetchProducts } from './adminService.js';
import { renderDashboard, renderProducts} from './render.js';

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchDashboardData();
  
  renderDashboard(data);
  
});
