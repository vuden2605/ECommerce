const orderService = {
    async getOrders() {
      try {
        const res = await fetch('http://localhost:3000/order/user', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });
  
        if (!res.ok) throw new Error('Lỗi khi lấy danh sách đơn hàng');
  
        const data = await res.json();
        return data; 
      } catch (err) {
        console.error('Lỗi:', err);
        return [];
      }
    }
  };
  
export default orderService;
  