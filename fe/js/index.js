document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    fetchCategories();
    const accessToken = localStorage.getItem("token"); 

    if (accessToken) {
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("registerBtn").style.display = "none";
    }
});
document.getElementById('product-list').addEventListener('click', async function (e) {
  if (e.target.classList.contains('add-to-cart')) {
    const productId = e.target.dataset.id;
    await addToCart(productId);
  }
});

async function fetchCategories() {
  const categoryList = document.getElementById('category-list');
  try {
    const response = await fetch('http://localhost:3000/categories');
    const { categories } = await response.json();

    // Thêm nút "Tất cả"
    categoryList.innerHTML = `<button class="btn btn-outline-dark mx-2 mb-2" onclick="fetchProducts()">Tất cả</button>`;

    categories.forEach(category => {
      categoryList.innerHTML += `
        <button class="btn btn-outline-dark mx-2 mb-2" onclick="fetchProducts(${category.id})">
          ${category.name}
        </button>
      `;
    });
  } catch (err) {
    console.error('Lỗi khi fetch categories:', err);
  }
}
async function fetchProducts(categoryId) {
  const productList = document.getElementById('product-list');
  console.log('Fetching products with categoryId:', categoryId);
  let url = 'http://localhost:3000/products';
  if (categoryId) {
    url += `?category_id=${categoryId}`;
  }
  try {
    const response = await fetch( url);
    const { products } = await response.json();
    productList.innerHTML = '';
    products.forEach(product => {
      productList.innerHTML += `
        <div class="col-md-3 mb-3">
          <div class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text text-primary mt-auto fw-bold">${product.price} VNĐ</p>
              <button class="btn btn-sm btn-success mt-2 add-to-cart" 
                data-id=${product.id}>
                🛒 Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>

      `;
    });
  } catch (err) {
    console.error('Lỗi khi fetch sản phẩm:', err);
  }
}
async function addToCart(productId) {
  try {
    const res = await fetch('http://localhost:3000/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        productId: productId,
        quantity: 1
      })
    });

    const data = await res.json();
    console.log("Phản hồi server:", res.status, data);

    if (!res.ok) {
      throw new Error(data.message || 'Lỗi khi thêm vào giỏ');
    }

    alert('✅ Thêm vào giỏ hàng thành công!');
  } catch (error) {
    console.error('❌ Lỗi khi gọi API thêm giỏ hàng:', error);
    alert('⚠️ Thêm vào giỏ thất bại!');
  }
}
