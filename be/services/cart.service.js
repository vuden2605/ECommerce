const { sql } = require('../config/db.config');
module.exports = {
    addToCart: async (productId, userId) => {
        try {
            const query = 'INSERT INTO cart (user_id, product_id) VALUES (@userId, @productId)';
            const request = new sql.Request();
            request.input('userId', sql.Int, userId);
            request.input('productId', sql.Int, productId);
            await request.query(query);
            return { message: 'Product added to cart successfully' };
        } catch (error) {
            console.error('Error adding product to cart:', error);
            throw error;
        }
    }
}