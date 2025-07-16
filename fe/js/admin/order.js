import { fetchOrders } from './adminService.js';
import {  renderOrders } from './eventHandle.js';
document.addEventListener('DOMContentLoaded', async () => {
  const orders = await fetchOrders();
  renderOrders(orders);
});
