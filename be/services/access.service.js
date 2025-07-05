const { sql } = require('../config/db.config');
const validator = require('validator');
module.exports = {
    getUserByEmail: async (email) => {
        try{
            const query = 'SELECT * FROM users WHERE email = @email';
            const request = new sql.Request();
            request.input ('email', sql.VarChar, email); 
            const result = await request.query(query);
            return result.recordset[0] || null; 
        }
        catch (error) {
            console.error('Error fetching user by email:', error);
            throw error; 
        }
    },
    createUser : async (userData) => {
        try {
            if (!validator.isEmail(userData.email)) {
                throw new Error('Invalid email format');
            }
            if(!validator.isMobilePhone(userData.phone, 'vi-VN')) {
                throw new Error('Invalid phone number format');
            }
            const query = 'INSERT INTO users (name, email, password, phone) VALUES (@name, @email, @password, @phone)';
            const request = new sql.Request();
            request.input('name', sql.VarChar, userData.name);
            request.input('email', sql.VarChar, userData.email);
            request.input('password', sql.VarChar, userData.password);
            request.input('phone', sql.VarChar, userData.phone);
            const result = await request.query(query);
            return result.message;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error; 
        }
    },
    getUserById: async (id) => {
        try{
            const query = 'SELECT name, email, phone FROM users WHERE id = @id';
            const request = new sql.Request();
            request.input ('id', sql.Int, id); 
            const result = await request.query(query);
            return result.recordset[0] || null; 
        }
        catch (error) {
            console.error('Error fetching user by id:', error);
            throw error; 
        }
    },
}