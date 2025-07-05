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
  