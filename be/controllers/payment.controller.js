const orderService = require('../services/order.service');
const cartService = require('../services/cart.service');
const invoiceService = require('../services/invoice.service');
module.exports= {
    handlePayment: async (req, res) => {
        try {
            let { orderId, resultCode, extraData } = req.query;
            const invoice_id = parseInt(extraData.split('_')[0]);
            const userId = parseInt(extraData.split('_')[1]);
            orderId=orderId.split('_')[0];
            let message = '';
            if (resultCode === '0') {
                // Payment successful
                await invoiceService.updateInvoice(invoice_id, 'Paid');
                await cartService.deleteCartByUser(userId);
                message = '💰 Thanh toán thành công!';
            }
            else {
                //delete order
                await orderService.deleteOrder(orderId);
                //delete order detail
                await orderService.deleteOrderDetail(orderId);
                //update invoice
                await invoiceService.updateInvoice(invoice_id, 'Failed');
                message = '❌ Thanh toán thất bại!';
            }
            return res.send(`
                <!DOCTYPE html>
                <html lang="vi">
                <head>
                  <meta charset="UTF-8">
                  <title>Kết quả thanh toán</title>
                </head>
                <body>
                  <h2>${message}</h2>
                  <p>Bạn sẽ được chuyển về trang chủ sau 3 giây...</p>
                  <script>
                    setTimeout(() => {
                      window.location.href = '/index.html';
                    }, 3000);
                  </script>
                </body>
                </html>
              `);
        } catch (error) {
            console.error('Error handling payment:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}