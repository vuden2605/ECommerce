const bcrypt = require('bcrypt');
const accessService = require('../services/access.service.js'); 
const jwt = require('jsonwebtoken');
require('dotenv').config(); 
module.exports = {
    register: async (req,res) => {
        const { name, email, password, phone } = req.body;
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        try {
            // Kiểm tra email đã tồn tại
            const existingUser = await accessService.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);

            // Tạo người dùng mới
            const newUser = await accessService.createUser({
                name,
                email,
                password: hashedPassword,
                phone
            });

            return res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            console.error('Error during registration:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

    } ,
    login:  async (req,res) => {
        const { email, password } = req.body;  
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        try {
            const user = await accessService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Kiểm tra mật khẩu
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            const accessToken = jwt.sign(
                { id: user.id, email: user.email, role: user.role }, 
                process.env.JWT_SECRET,             
                { expiresIn: '7d' }                 
            );
          
            return res.status(200).json({
            message: 'Login successful',
            token: accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
            });
        }
        catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
