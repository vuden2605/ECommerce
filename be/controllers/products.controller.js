const { get } = require('../routes/access.route');
const productsService = require('../services/products.service');
module.exports = {
    getAllProducts: async (req,res) => {
        try {
            const category_id = req.query.category_id || null; 
            const products = await productsService.getAllProducts(category_id);
            return res.status(200).json({
                message: 'Products retrieved successfully',
                products: products
            });
        }
        catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getProductsById: async (req,res) => {
        try {
            const id = req.params.id;
            const product = await productsService.getProductsById(id);
            return res.status(200).json({
                message: 'Product retrieved successfully',
                product: product
            });
        }
        catch (error) {
            console.error('Error fetching product by ID:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}