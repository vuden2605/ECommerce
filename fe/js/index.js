document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
  });
  
async function fetchProducts() {
    const productList = document.getElementById('product-list');
    try {
        const response = await fetch('http://localhost:3000/products');
        const { products }= await response.json();
        console.log("Danh sách sản phẩm:", products);

        productList.innerHTML = '';

        products.forEach(product => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        slide.innerHTML = `
            <div class="product-card position-relative">
            <div class="image-holder">
                <img src="${product.image}" alt="product-item" class="img-fluid">
            </div>
            <div class="cart-concern position-absolute">
                <div class="cart-button d-flex">
                <a href="#" class="btn btn-medium btn-black">Add to Cart
                    <svg class="cart-outline"><use xlink:href="#cart-outline"></use></svg>
                </a>
                </div>
            </div>
            <div class="card-detail d-flex justify-content-between align-items-baseline pt-3">
                <h3 class="card-title text-uppercase">
                <a href="#">${product.name}</a>
                </h3>
                <span class="item-price text-primary">$${product.price}</span>
            </div>
            </div>
        `;

        productList.appendChild(slide);
        });

        // Re-init Swiper
        new Swiper('.product-swiper', {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        });

    } catch (err) {
        console.error("Lỗi fetch sản phẩm:", err);
    }
}
  