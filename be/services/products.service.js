const { sql } = require('../config/db.config');
module.exports = {
    getAllProducts: async(category_id) => {
        try {
            const query = `SELECT p.id, p.name, p.price, p.description, p.image, p.stock, c.name AS category_name 
                            FROM products p
                            LEFT JOIN categories c ON p.category_id = c.id  
                            WHERE @category_id IS NULL OR category_id = @category_id`;
            const request = new sql.Request();
            request.input('category_id', sql.Int, category_id);
            const result = await request.query(query);
            return result.recordset || []; 
        }
        catch (error) {
            console.error('Error fetching products:', error);
            throw error; 
        }
    },
    getProductsById: async(id) => {
        try {
            const query = 'SELECT * FROM products WHERE id = @id';
            const request = new sql.Request();
            request.input('id', sql.Int, id);
            const result = await request.query(query);
            return result.recordset[0] || null; 
        }
        catch (error) {
            console.error('Error fetching product by ID:', error);
            throw error; 
        }
    },
    
}