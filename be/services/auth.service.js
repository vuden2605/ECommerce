const jwt = require('jsonwebtoken');
require('dotenv').config(); 
module.exports={
    authorization: (role) => {
        return (req,res,next) => {
            if (req.user.role != role) {
                return res.status(403).json({ message: 'Access denied' });
            }
            next();
        }
        
    },
    authentication: (req, res, next) => {
        const token = req.headers['authorization'].split(' ')[1];
        console.log('Token:', token); // Log the token for debugging
        if (!token) {
            return res.status(401).json({ message: 'miss token' });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { id: decoded.id , email: decoded.email, role: decoded.role }; // Add user info to request object
            next();
        }
        catch (error) {
            console.error('Authentication error:', error);
            return res.status(401).json({ message: 'Invalid token' });
        }     
    }
}