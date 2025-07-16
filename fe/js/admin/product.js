import { fetchProducts } from './adminService.js';
import { renderProducts } from './eventHandle.js';
document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  renderProducts(products);
});
