const invoiceService = require('../services/invoice.service');
module.exports = {
    getInvoicesByUser: async (req,res) => {
        try {
            const userId = req.user.id;
            const invoices = await invoiceService.getInvoicesByUser(userId);
            res.status(200).json(invoices);
        } catch (error) {
            console.error('Error fetching invoices:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getAllInvoices: async (req, res) => {
        try {
            const invoices = await invoiceService.getAllInvoices();
            res.status(200).json(invoices);
        } catch (error) {
            console.error('Error fetching all invoices:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    createInvoice: async (req, res) => {
        try {
            const { order_id, payment_method, total_amount } = req.body;
            const invoice = await invoiceService.createInvoice(order_id, payment_method, total_amount);
            if (invoice) {
                res.status(201).json({ message: 'Invoice created successfully' });
            } else {
                res.status(400).json({ message: 'Failed to create invoice' });
            }
        } catch (error) {
            console.error('Error creating invoice:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    payBillCod: async (req, res) => {
        try {
            
            const { products, total_price, shipping_info } = req.body;
            const user_id = req.user.id;
            const result = await invoiceService.payBillCod(user_id, products, 'Pending', total_price, shipping_info);
            if (result) {
                res.status(200).json({ message: 'Bill paid successfully' });
            } else {
                res.status(400).json({ message: 'Failed to pay bill' });
            }
        } catch (error) {
            console.error('Error paying bill:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    payMoMo: async (req, res) => {
        try {
            const user_id = req.user.id;
            const { products, total_price, shipping_info } = req.body;
            const momoResponse = await invoiceService.payMoMo(user_id, products, total_price, shipping_info);
            
            // Check if payment URL is available
            if (momoResponse?.payUrl) {
                return res.status(200).json({
                    success: true,
                    message: 'Tạo thanh toán thành công',
                    payUrl: momoResponse.payUrl,
                    order_id: momoResponse.order_id,
                    invoice_id: momoResponse.invoice_id,
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: 'Không thể tạo yêu cầu thanh toán MoMo',
                    error: momoResponse?.message || 'Unknown error',
                });
            }
            
        } catch (error) {
            console.error('Lỗi tạo thanh toán MoMo:', error);
            return res.status(500).json({
                success: false,
                message: 'Đã xảy ra lỗi trong quá trình tạo thanh toán MoMo',
            });
        }
    }
    
}
