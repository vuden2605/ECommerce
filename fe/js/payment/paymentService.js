window.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('orderId');
    const resultCode = params.get('resultCode');
    const extraData = params.get('extraData');
  
    if (!orderId || !resultCode || !extraData) {
      alert('Thiếu dữ liệu thanh toán!');
      window.location.href = '/index.html';
      return;
    }
  
    try {
      const response = await fetch(`/handlePayment?orderId=${orderId}&resultCode=${resultCode}&extraData=${extraData}`);
      const result = await response.json();
  
      alert(result.message); // Hiển thị kết quả
      setTimeout(() => {
        window.location.href = '/index.html';
      }, 3000);
    } catch (error) {
      console.error('Lỗi xử lý thanh toán:', error);
      alert('Đã xảy ra lỗi. Đang quay về trang chính...');
      window.location.href = '/index.html';
    }
  });
  