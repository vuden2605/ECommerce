import { fetchCart, deleteItem, increaseItem, decreaseItem, payCod } from './cartService.js';
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
export const setupCheckoutListener = (cart) => {
  const btn = document.getElementById("checkout-btn");
  const paymentMethodEl = document.getElementById("payment-method");
  const shippingInput = document.getElementById("shipping-address");

  if (!btn || !paymentMethodEl || !shippingInput) return;

  btn.addEventListener("click", async () => {
    try {
      const paymentMethod = paymentMethodEl.value;
      const shipping_info = shippingInput.value.trim() || "Chưa cung cấp";

      const products = cart.map(item => ({
        id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }));

      const total_price = products.reduce((sum, item) => sum + item.price * item.quantity, 0);

      let res;

      if (paymentMethod === "COD") {
        res = await payCod({ products, shipping_info, total_price });
      } else {
        alert("Phương thức thanh toán chưa được hỗ trợ.");
        return;
      }

      if (!res.ok) throw new Error();

      alert("Thanh toán thành công!");
      renderCart(); // clear cart UI sau thanh toán
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Không thể thanh toán. Vui lòng thử lại.");
    }
  });
};



