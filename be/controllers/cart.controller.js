const cartService = require('../services/cart.service');
module.exports = {
    addToCart: async (req, res) => {
        try{
            const { productId, quantity } = req.body;
            const userId = req.user.id; 
            if (!productId) {
                return res.status(400).json({ message: 'Product ID is required' });
            }
            const result = await cartService.addToCart(userId, productId, quantity);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error('Error adding to cart:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}