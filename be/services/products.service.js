const { sql } = require('../config/db.config');
module.exports = {
    getAllProducts: async() => {
        try {
            const query = 'SELECT * FROM products';
            const request = new sql.Request();
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