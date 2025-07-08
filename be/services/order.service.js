const sql = require('../config/db.config');
module.exports = {
    getAllOrders: async () => {
        try {
            const query = 'SELECT * FROM orders';
            const request = new sql.Request();
            const result = await request.query(query);
            return result.recordset || []; 
        } catch (error) {
            console.error('Error fetching all orders:', error);
            throw error; 
        }
    },
    getOrdersByUser: async (user_id) => {
        try {
            const query = 'SELECT * FROM orders where user_id = @userid';
            const request = new sql.Request();
            request.input('userid', sql.Int, userid);
            const result = await request.query(query);
            return result.recordset || []; 
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error; 
        }
    },
    createOrder: async (userid, totals_price, shipping_info) => {
        try {
            const query = 'INSERT INTO orders (userid, products, totals_price, shipping_info) VALUES (userid, totals_price, shipping_info)';
            const request = new sql.Request();
            request.input('userid', sql.Int, userid);
            request.input('totalPrice', sql.Float, totals_price);
            request.input('shippingInfo', sql.NVarChar, JSON.stringify(shipping_info));
            const result = await request.query(query);
            return result.rowsAffected > 0; 
        } catch (error) {
            console.error('Error creating order:', error);
            throw error; 
        }
    },
    createOrderDetail: async (orderId, productId, quantity, price) => {
        try {
            const query = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (@orderId, @productId, @quantity, @price)';
            const request = new sql.Request();
            request.input('orderId', sql.Int, orderId);
            request.input('productId', sql.Int, productId);
            request.input('quantity', sql.Int, quantity);
            request.input('price', sql.Float, price);
            const result = await request.query(query);
            return result.rowsAffected > 0; 
        } catch (error) {
            console.error('Error creating order detail:', error);
            throw error; 
        }
    }
}