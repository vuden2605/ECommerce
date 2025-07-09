const { sql } = require('../config/db.config');
module.exports = {
    getCartItems: async (userId) => {
        try {
            const query = `SELECT * FROM CartItems c
                           JOIN Products p on c.product_id=p.id
                           WHERE user_id = @userId`;
            const request = new sql.Request();
            request.input('userId', sql.Int, userId);
            const result = await request.query(query);
            return result.recordset;
        } catch (error) {
            console.error('Error fetching cart items:', error);
            throw error;
        }
    },
    addToCart: async (userId,productId,quantity) => {
        try {
            const query_check = 'SELECT * FROM CartItems WHERE user_id = @userId AND product_id = @productId';
            const request_check = new sql.Request();
            request_check.input('userId', sql.Int, userId);
            request_check.input('productId', sql.Int, productId);
            const result_check = await request_check.query(query_check);
            if (result_check.recordset.length > 0) {
                // If the product is already in the cart, update the quantity
                const updateQuery = 'UPDATE CartItems SET quantity = quantity + @quantity WHERE user_id = @userId AND product_id = @productId';
                const updateRequest = new sql.Request();
                updateRequest.input('userId', sql.Int, userId);
                updateRequest.input('productId', sql.Int, productId);
                updateRequest.input('quantity', sql.Int, quantity);
                await updateRequest.query(updateQuery);
                return { message: 'Product quantity updated in cart' };
            }
            const query = 'INSERT INTO CartItems (user_id, product_id, quantity) VALUES (@userId, @productId, @quantity)';
            const request = new sql.Request();
            request.input('userId', sql.Int, userId);
            request.input('productId', sql.Int, productId);
            request.input('quantity', sql.Int, quantity);
            await request.query(query);
            return { message: 'Product added to cart successfully' };
        } catch (error) {
            console.error('Error adding product to cart:', error);
            throw error;
        }
    },
    deleteCartDetail: async (userId, productId) => {
        try {
            const query = 'DELETE FROM CartItems WHERE user_id = @userId AND product_id = @productId';
            const request = new sql.Request();
            request.input('userId', sql.Int, userId);
            request.input('productId', sql.Int, productId);
            await request.query(query);
            return { message: 'Product removed from cart successfully' };
        } catch (error) {
            console.error('Error removing product from cart:', error);
            throw error;
        }
    },
    increaseQuantity: async (userId, productId) => {
        try {
            const query = 'UPDATE CartItems SET quantity = quantity + 1 WHERE user_id = @userId AND product_id = @productId';
            const request = new sql.Request();
            request.input('userId', sql.Int, userId);
            request.input('productId', sql.Int, productId);
            await request.query(query);
            return { message: 'Product quantity increased successfully' };
        } catch (error) {
            console.error('Error increasing product quantity:', error);
            throw error;
        }
    },
    decreaseQuantity: async (userId, productId) => {
        try {
            const query = 'UPDATE CartItems SET quantity = quantity - 1 WHERE user_id = @userId AND product_id = @productId AND quantity > 1';
            const request = new sql.Request();
            request.input('userId', sql.Int, userId);
            request.input('productId', sql.Int, productId);
            await request.query(query);
            return { message: 'Product quantity decreased successfully' };
        } catch (error) {
            console.error('Error decreasing product quantity:', error);
            throw error;
        }
    },
    deleteCartByUser: async (userId) => {
        try {
            const query = 'DELETE FROM CartItems WHERE user_id = @userId';
            const request = new sql.Request();
            request.input('userId', sql.Int, userId);
            await request.query(query);
            return { message: 'Cart cleared successfully' };
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    }
}