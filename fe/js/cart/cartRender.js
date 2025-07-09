export const renderCart = (cart) => {
    const cartItemsDiv = document.getElementById("cart-items");
    const totalPriceSpan = document.getElementById("total-price");
    
    if (!cartItemsDiv || !totalPriceSpan) return;
  
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
        </div>`;
      cartItemsDiv.innerHTML += itemHTML;
      total += item.price * item.quantity;
    });
  
    totalPriceSpan.textContent = total.toLocaleString("vi-VN") + " VNĐ";
  };
  