document.addEventListener("DOMContentLoaded", () => {
    fetchCart();
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
// Gắn sự kiện xóa
document.querySelectorAll(".delete-item").forEach(button => {
  button.addEventListener("click", async () => {
    const id = button.dataset.id;
    await fetch(`http://localhost:3000/cart/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
    fetchCart(); // render
  });
});

// Gắn sự kiện tăng số lượng
document.querySelectorAll(".quantity-increase").forEach(button => {
  button.addEventListener("click", async () => {
    const id = button.dataset.id;
    await fetch(`http://localhost:3000/cart/${id}/increase`, {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
    fetchCart();
  });
});

// Gắn sự kiện giảm số lượng
document.querySelectorAll(".quantity-decrease").forEach(button => {
  button.addEventListener("click", async () => {
    const id = button.dataset.id;
    await fetch(`http://localhost:3000/cart/${id}/decrease`, {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
    fetchCart();
  });
});
