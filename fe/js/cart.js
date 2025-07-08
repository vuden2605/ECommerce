document.addEventListener("DOMContentLoaded", async () => {
  await fetchCart();
  setupEventListeners();
});

const fetchCart = async () => {
  try {
      const res = await fetch('http://localhost:3000/cart', {
          headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
      });
      
      const cart = await res.json();
      console.log(cart);
      
      const cartItemsDiv = document.getElementById("cart-items");
      const totalPriceSpan = document.getElementById("total-price");
      
      // Nếu không có cart-items (tức không phải cart.html), chỉ trả kết quả về
      if (!cartItemsDiv || !totalPriceSpan) {
          return cart;
      }
      
      // Reset nội dung cũ
      cartItemsDiv.innerHTML = '';
      let total = 0;
      
      cart.forEach(item => {
          const itemHTML = `
              <div class="col-md-4 mb-3">
                  <div class="card">
                      <div class="card-body">
                          <h5 class="card-title">${item.name}</h5>
                          <p class="card-text">Số lượng: ${item.quantity}</p>
                          <p class="card-text text-primary">${item.price} VNĐ</p>
                          <div class="d-flex align-items-center mb-2">
                              <button class="btn btn-sm btn-outline-secondary me-2 quantity-decrease" data-id="${item.id}">−</button>
                              <span class="quantity-value" data-id="${item.id}">${item.quantity}</span>
                              <button class="btn btn-sm btn-outline-secondary ms-2 quantity-increase" data-id="${item.id}">+</button>
                          </div>
                          <button class="btn btn-sm btn-danger delete-item" data-id="${item.id}">🗑 Xóa</button>
                      </div>
                  </div>
              </div>
          `;
          cartItemsDiv.innerHTML += itemHTML;
          total += item.price * item.quantity;
      });
      
      totalPriceSpan.textContent = total.toLocaleString("vi-VN") + " VNĐ";
      
      return cart;
      
  } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
      alert("Không thể tải giỏ hàng. Vui lòng thử lại.");
      return [];
  }
};

// Hàm setup event listeners sử dụng event delegation
const setupEventListeners = () => {
  const cartItemsDiv = document.getElementById("cart-items");
  
  if (!cartItemsDiv) return;
  
  // Sử dụng event delegation - gắn listener vào container chứa các nút
  cartItemsDiv.addEventListener("click", async (e) => {
      const target = e.target;
      
      // Xử lý nút xóa
      if (target.classList.contains("delete-item")) {
          const id = target.dataset.id;
          try {
              await fetch(`http://localhost:3000/cart/${id}`, {
                  method: "DELETE",
                  headers: {
                      "Authorization": "Bearer " + localStorage.getItem("token")
                  }
              });
              await fetchCart();
          } catch (err) {
              console.error("Lỗi khi xóa sản phẩm:", err);
              alert("Không thể xóa sản phẩm. Vui lòng thử lại.");
          }
      }
      
      // Xử lý nút tăng số lượng
      if (target.classList.contains("quantity-increase")) {
          const id = target.dataset.id;
          try {
              await fetch(`http://localhost:3000/cart/${id}/increase`, {
                  method: "PATCH",
                  headers: {
                      "Authorization": "Bearer " + localStorage.getItem("token")
                  }
              });
              await fetchCart();
          } catch (err) {
              console.error("Lỗi khi tăng số lượng:", err);
              alert("Không thể tăng số lượng. Vui lòng thử lại.");
          }
      }
      
      // Xử lý nút giảm số lượng
      if (target.classList.contains("quantity-decrease")) {
          const id = target.dataset.id;
          try {
              await fetch(`http://localhost:3000/cart/${id}/decrease`, {
                  method: "PATCH",
                  headers: {
                      "Authorization": "Bearer " + localStorage.getItem("token")
                  }
              });
              await fetchCart();
          } catch (err) {
              console.error("Lỗi khi giảm số lượng:", err);
              alert("Không thể giảm số lượng. Vui lòng thử lại.");
          }
      }
  });
};