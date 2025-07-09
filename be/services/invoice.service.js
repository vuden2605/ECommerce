const { sql } = require('../config/db.config');
const orderService = require('./order.service');
module.exports = {
    getInvoicesByUser: async (userid) => {
        try {
            const query = 'SELECT * FROM invoices WHERE userid = @userid';
            const request = new sql.Request();
            request.input('userid', sql.Int, userid);
            const result = await request.query(query);
            return result.recordset || []; 
        } catch (error) {
            console.error('Error fetching invoices:', error);
            throw error; 
        }
    },

    getAllInvoices: async () => {
        try {
            const query = 'SELECT * FROM invoices';
            const request = new sql.Request();
            const result = await request.query(query);
            return result.recordset || [];
        } catch (error) {
            console.error('Error fetching all invoices:', error);
            throw error;
        }
    },

    createInvoice: async (order_id, payment_method, payment_status, total_amount) => {
        try {
            const query = 'INSERT INTO invoices (order_id, payment_method, total_amount) VALUES (@order_id, @payment_method, @total_amount)';
            const request = new sql.Request();
            request.input('order_id', sql.Int, order_id);
            request.input('payment_method', sql.NVarChar, payment_method);
            request.input('total_amount', sql.Float, total_amount);
            const result = await request.query(query);
            return result.rowsAffected > 0; 
        } catch (error) {
            console.error('Error creating invoice:', error);
            throw error; 
        }
    },
    payBillCod: async (user_id, products, status='Pending', total_price, shipping_info) => {
        try {
            const order_id = await orderService.createOrder(user_id, status, total_price, shipping_info);
            // Insert products into the order_products table
            for (const product of products) {
                const success = await orderService.createOrderDetail(order_id, product.id, product.quantity, product.price);
                console.log(`Product ${product.id} added to order ${order_id}`);
                if (!success) {
                    throw new Error('Failed to add product to order');
                }
            }
            // Create invoice
            const result = await module.exports.createInvoice(order_id, 'COD', 'Pending', total_price);
            if (!result) {
                throw new Error('Failed to create invoice');
            }
            return result;
        } catch (error) {
            console.error('Error paying bills:', error);
            throw error; 
        } 
    }
}