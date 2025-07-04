const { sql } = require('../config/db.config');
module.exports = {
    addToCart: async (productId, userId,quantity) => {
        try {
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
    }
}