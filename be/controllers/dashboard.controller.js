const dashboardService = require('../services/dashboard.service');
module.exports = {
    getDashboardAdmin: async (req, res) => {
        try {
            const dashboardData = await dashboardService.getDashBoardAdmin();
            return res.status(200).json({
                success: true,
                data: dashboardData
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }
}
