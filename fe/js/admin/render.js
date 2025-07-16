export function renderDashboard(data) {
    if (data.success && data.data) {
      document.getElementById('total-users').textContent = data.data.totalUsers;
      document.getElementById('total-products').textContent = data.data.totalProducts;
      document.getElementById('total-orders').textContent = data.data.totalOrders;
    } else {
      alert('Không lấy được dữ liệu dashboard!');
    }
}

export function renderProducts(products) {
    const tbody = document.getElementById('product-table-body');
    tbody.innerHTML = '';
  
    if (products && products.length > 0) {
      products.forEach((product, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.stock}</td>
          <td>${product.category_name || 'Không rõ'}</td>
          <td>
            <button class="btn btn-sm btn-warning">Sửa</button>
            <button class="btn btn-sm btn-danger">Xoá</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    } else {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">Không có sản phẩm nào</td></tr>`;
    }
}
export function renderUsers(users) {
    const tbody = document.getElementById('user-table-body');
    if (!tbody) return;
  
    tbody.innerHTML = ''; // Clear cũ
  
    users.forEach((user, index) => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone || 'Chưa cập nhật'}</td>
        <td>${user.role}</td>
        <td>${user.created_at}</td> 
        <td>
          <button class="btn btn-sm btn-warning">Sửa</button>
          <button class="btn btn-sm btn-danger">Xoá</button>
        
      `;
  
      tbody.appendChild(row);
    });
  }
export function renderOrders(orders) {
    const tbody = document.getElementById('order-table-body');
    if (!tbody) return;
  
    tbody.innerHTML = ''; // Clear cũ
  
    orders.forEach((order, index) => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${order.name}</td>
        <td>${order.total_price}</td>
        <td>${order.status}</td>
        <td>${order.created_at}</td>
        <td>${order.shipping_info}</td>
        <td>
          <button class="btn btn-sm btn-warning">Sửa</button>
          <button class="btn btn-sm btn-danger">Xoá</button>
        </td>
      `;
  
      tbody.appendChild(row);
    });
}
  
  