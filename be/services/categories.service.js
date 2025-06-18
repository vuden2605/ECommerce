const { sql } = require('../config/db.config');
module.exports = {
    getAllCategories: async() => {
        try {
            const query = 'SELECT * FROM categories';
            const request = new sql.Request();
            const result = await request.query(query);
            return result.recordset || []; 
        }
        catch (error) {
            console.error('Error fetching categories:', error);
            throw error; 
        }
    }
}