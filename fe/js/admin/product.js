import { fetchProducts } from './adminService.js';
import { renderProducts } from './render.js';
document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  renderProducts(products);
  document.getElementById('show-add-form-btn').addEventListener('click', () => {
    document.getElementById('add-product-card').classList.toggle('d-none'); });
});
