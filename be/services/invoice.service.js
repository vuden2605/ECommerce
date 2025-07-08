const sql = require('../config/db.config');
module.exports = {
    getInvoicesByUser: async (userid) => {
        try {
            const query = 'SELECT * FROM invoices WHERE userid = @userid';
            const request = new sql.Request();
            request.input('userid', sql.Int, userid);
            const result = await request.query(query);
            return result.recordset || []; 
        } catch (error) {
            console.error('Error fetching invoices:', error);
            throw error; 
        }
    },

    getAllInvoices: async () => {
        try {
            const query = 'SELECT * FROM invoices';
            const request = new sql.Request();
            const result = await request.query(query);
            return result.recordset || [];
        } catch (error) {
            console.error('Error fetching all invoices:', error);
            throw error;
        }
    },

    createInvoice: async (order_id, payment_method, total_amount) => {
        try {
            const query = 'INSERT INTO invoices (order_id, payment_method, total_amount) VALUES (@order_id, @payment_method, @total_amount)';
            const request = new sql.Request();
            request.input('order_id', sql.Int, order_id);
            request.input('payment_method', sql.NVarChar, payment_method);
            request.input('total_amount', sql.Float, total_amount);
            const result = await request.query(query);
            return result.rowsAffected > 0; 
        } catch (error) {
            console.error('Error creating invoice:', error);
            throw error; 
        }
    },
    payBills: async (user_id) => {


    }
}