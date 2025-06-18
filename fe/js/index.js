document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    fetchCategories();
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
            </div>
          </div>
        </div>

      `;
    });
  } catch (err) {
    console.error('Lỗi khi fetch sản phẩm:', err);
  }
}
