const orderService = require('../services/order.service');
const cartService = require('../services/cart.service');
const invoiceService = require('../services/invoice.service');
module.exports= {
    getInfoPayment: async (req, res) => {
        let { orderId, resultCode } = req.query;
        orderId=orderId.spilit('_')[0];
        if (resultCode === '0') {

            // Payment successful
            res.status(200).json({ success: true, message: 'Payment successful', orderId });
        }
        
    }
}