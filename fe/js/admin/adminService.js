export async function fetchDashboardData() {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    const data = await res.json();
    if (data.success) {
      return data;
    } else {
      throw new Error('Không lấy được dữ liệu dashboard!');
    }
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu dashboard:', err);
    return { success: false };
  }
}
export async function fetchProducts() {
  try {
    const res = await fetch('http://localhost:3000/products');
    if (!res.ok) {
      throw new Error('Lỗi khi lấy sản phẩm');
    }
    const { products } = await res.json();
    return products;
  } catch (err) {
    console.error('Lỗi khi fetch sản phẩm:', err);
    return [];
  }
}
export async function fetchUsers() {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/access/getAllUser', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    if (!res.ok) {
      throw new Error('Lỗi khi lấy người dùng');
    }
    
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.error('Lỗi khi fetch người dùng:', err);
    return [];
  }
}