const { sql } = require('../config/db.config');
module.exports = {
    getDashBoardAdmin: async () => {
        try {
            const request = new sql.Request();
        
            const result = await request.batch(`
              SELECT COUNT(*) AS totalUsers FROM users where role = 'user';
              SELECT COUNT(*) AS totalProducts FROM products;
              SELECT COUNT(*) AS totalOrders FROM orders WHERE status = 'pending';
            `);
        
            const totalUsers = result.recordsets[0][0].totalUsers;
            const totalProducts = result.recordsets[1][0].totalProducts;
            const totalOrders = result.recordsets[2][0].totalOrders;
        
            return {
                totalUsers,
                totalProducts,
                totalOrders
            };
          } catch (err) {
            console.error('Error fetching dashboard data:', err);
            throw err;
          }
    }
}
