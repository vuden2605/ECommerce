import orderService from './orderService.js';

export const renderOrders = async () => {
  const tbody = document.getElementById('listOrder');
  const orders = await orderService.getOrders();

  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Không có đơn hàng nào.</td></tr>`;
    return;
  }

  orders.forEach(order => {


    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.status}</td>
      <td>${Number(order.total_price).toLocaleString()} đ</td>
      <td>${new Date(order.created_at).toLocaleDateString('vi-VN')}</td>
      <td>${order.shipping_info}</td>
    `;

    tbody.appendChild(row);
  });
};