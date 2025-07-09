import { fetchCart, deleteItem, increaseItem, decreaseItem, checkout } from './cartService.js';
import { renderCart } from './cartRender.js';

export const setupCartEventListeners = () => {
  const cartItemsDiv = document.getElementById("cart-items");
  if (!cartItemsDiv) return;

  cartItemsDiv.addEventListener("click", async (e) => {
    const target = e.target;
    const id = target.dataset.id;

    if (target.classList.contains("delete-item")) {
      await deleteItem(id);
    }

    if (target.classList.contains("quantity-increase")) {
      await increaseItem(id);
    }

    if (target.classList.contains("quantity-decrease")) {
      await decreaseItem(id);
    }

    const cart = await fetchCart();
    renderCart(cart);
  });
};

export const setupCheckoutListener = () => {
  const btn = document.getElementById("checkout-btn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    try {
      const res = await checkout();
      if (!res.ok) throw new Error();
      alert("Thanh toán thành công!");
      const cart = await fetchCart();
      renderCart(cart);
    } catch {
      alert("Không thể thanh toán. Vui lòng thử lại.");
    }
  });
};
