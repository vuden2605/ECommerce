const { sql } = require('../config/db.config');
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
    createOrder: async (user_id, status, total_price, shipping_info) => {
        try {
            const query = `
                INSERT INTO orders (user_id, status, total_price, shipping_info)
                OUTPUT INSERTED.id
                VALUES (@user_id, @status, @total_price, @shipping_info)
            `;
            const request = new sql.Request();
            request.input('user_id', sql.Int, user_id);
            request.input('status', sql.NVarChar, status);
            request.input('total_price', sql.Decimal(10,2), total_price);
            request.input('shipping_info', sql.NVarChar, JSON.stringify(shipping_info));
            const result = await request.query(query);
            console.log('Order created with ID:', result.recordset[0].id);
            return result.recordset[0].id; 
        } catch (error) {
            console.error('Error creating order:', error);
            throw error; 
        }
    },
    createOrderDetail: async (orderId, productId, quantity, price) => {
        try {
            const query = 'INSERT INTO orderitems (order_id, product_id, quantity, price) VALUES (@orderId, @productId, @quantity, @price)';
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
    },
    deleteOrder: async (orderId) => {
        try {
            const query = 'DELETE FROM orders WHERE id = @orderId';
            const request = new sql.Request();
            request.input('orderId', sql.Int, orderId);
            const result = await request.query(query);
            return result.rowsAffected > 0; 
        } catch (error) {
            console.error('Error deleting order:', error);
            throw error; 
        }
    },
    deleteOrderDetail: async (orderId) => {
        try {
            const query = 'DELETE FROM orderitems WHERE order_id = @orderId';
            const request = new sql.Request();
            request.input('orderId', sql.Int, orderId);
            const result = await request.query(query);
            return result.rowsAffected > 0; 
        } catch (error) {
            console.error('Error deleting order detail:', error);
            throw error; 
        }
    }

}