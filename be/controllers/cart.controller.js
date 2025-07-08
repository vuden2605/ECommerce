const cartService = require('../services/cart.service');
module.exports = {
    getCartItems: async (req, res) => {
        try {
            const userId = req.user.id; 
            const cartItems = await cartService.getCartItems(userId);
            return res.status(200).json(cartItems);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
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
    },
    increaseQuantity: async (req, res) => {
        try {
            const { productId } = req.params;
            const userId = req.user.id; 
            if (!productId) {
                return res.status(400).json({ message: 'Product ID is required' });
            }
            const result = await cartService.increaseQuantity(userId, productId);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error increasing quantity:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    decreaseQuantity: async (req, res) => {
        try {
            const { productId } = req.params;
            const userId = req.user.id; 
            if (!productId) {
                return res.status(400).json({ message: 'Product ID is required' });
            }
            const result = await cartService.decreaseQuantity(userId, productId);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error decreasing quantity:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteCart: async (req, res) => {
        try {
            const { productId } = req.params;
            const userId = req.user.id; 
            if (!productId) {
                return res.status(400).json({ message: 'Product ID is required' });
            }
            const result = await cartService.deleteCart(userId, productId);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error deleting cart item:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}