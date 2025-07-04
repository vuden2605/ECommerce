module.exports={
    authorization: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    },
    authentication: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.status(400).json({ message: 'Already authenticated' });
        }
        next();
    }
}