const orderService = require('../services/order.service');
module.exports = {
    getAllOrders: async (req, res) => {
        try {
            const orders = await orderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching all orders:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getOrdersByUser: async (req, res) => {
        try {
            const userId = req.user.id;
            const orders = await orderService.getAllOrders(userId);
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    createOrder: async (req, res) => {
        try {
            const { payment_method, total_amount } = req.body;
            const userId = req.user.id;
            const order = await orderService.createOrder(userId, payment_method, total_amount);
            res.status(201).json(order);
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    createOrderDetail: async(req, res) => {
        try {
            const { orderId, productId, quantity, price } = req.body;
            const result = await orderService.createOrderDetail(orderId, productId, quantity, price);
            if (result) {
                res.status(201).json({ message: 'Order detail created successfully' });
            } else {
                res.status(400).json({ message: 'Failed to create order detail' });
            }
        } catch (error) {
            console.error('Error creating order detail:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
