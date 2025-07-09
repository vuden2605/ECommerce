import { fetchCart } from './cartService.js';
import { renderCart } from './cartRender.js';
import { setupCartEventListeners, setupCheckoutListener } from './eventHandler.js';

document.addEventListener("DOMContentLoaded", async () => {
  const cart = await fetchCart();
  renderCart(cart);
  setupCartEventListeners();
  setupCheckoutListener(cart);
});
