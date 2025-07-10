const { sql } = require('../config/db.config');
const orderService = require('./order.service');
const cartService = require('./cart.service');
const axios = require('axios');
const crypto = require('crypto');
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

    createInvoice: async (order_id, payment_method, payment_status, total_amount) => {
        try {
            const query = `INSERT INTO invoices (order_id, payment_method, total_amount)
                            OUTPUT INSERTED.id 
                           VALUES (@order_id, @payment_method, @total_amount)`;
            const request = new sql.Request();
            request.input('order_id', sql.Int, order_id);
            request.input('payment_method', sql.NVarChar, payment_method);
            request.input('total_amount', sql.Float, total_amount);
            const result = await request.query(query);
            return  result.recordset[0].id; 
        } catch (error) {
            console.error('Error creating invoice:', error);
            throw error; 
        }
    },
    updateInvoice: async (invoice_id, payment_status) => {
        try {
            const query = 'UPDATE invoices SET payment_status = @payment_status WHERE id = @invoice_id';
            const request = new sql.Request();
            request.input('invoice_id', sql.Int, invoice_id);
            request.input('payment_status', sql.NVarChar, payment_status);
            const result = await request.query(query);
            return result.rowsAffected > 0; 
        } catch (error) {
            console.error('Error updating invoice:', error);
            throw error; 
        }
    },
    payBillCod: async (user_id, products, status='Pending', total_price, shipping_info) => {
        try {
            const order_id = await orderService.createOrder(user_id, status, total_price, shipping_info);
            // Insert products into the order_products table
            for (const product of products) {
                const success = await orderService.createOrderDetail(order_id, product.id, product.quantity, product.price);
                console.log(`Product ${product.id} added to order ${order_id}`);
                if (!success) {
                    throw new Error('Failed to add product to order');
                }
            }
            // Create invoice
            const result = await module.exports.createInvoice(order_id, 'COD', 'Pending', total_price);
            if (!result) {
                throw new Error('Failed to create invoice');
            }
            //delete cart
            await cartService.deleteCartByUser(user_id);
            return result;
        } catch (error) {
            console.error('Error paying bills:', error);
            throw error; 
        } 
    },
    payMoMo: async (user_id, products, total_price, shipping_info) => {
        let order_id = null;
        let invoice_id = null;
        
        try {
            const status = 'Pending';
            order_id = await orderService.createOrder(user_id, status, total_price, shipping_info);
            if (!order_id) throw new Error('Failed to create order');
            
            // 3. Add products to order
            for (const product of products) {
                const success = await orderService.createOrderDetail(order_id, product.id, product.quantity, product.price);
                console.log(`Product ${product.id} added to order ${order_id}`);
                if (!success) throw new Error(`Failed to add product ${product.id} to order`);
            }
            
            // 4. Create invoice
            const invoice_id = await module.exports.createInvoice(order_id, 'MOMO', 'Pending', total_price);
            if (!invoice_id) throw new Error('Failed to create invoice');
            
            // 5. MoMo payment configuration (should be in environment variables)
            const partnerCode = process.env.MOMO_PARTNER_CODE || 'MOMO';
            const accessKey = process.env.MOMO_ACCESS_KEY || 'F8BBA842ECF85';
            const secretKey = process.env.MOMO_SECRET_KEY || 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
            const requestType = 'payWithMethod';
            const orderInfoStr = `Thanh toán đơn hàng ${order_id}`;
            const redirectUrl = process.env.MOMO_REDIRECT_URL || 'http://localhost:3000/payment/success';
            const ipnUrl = process.env.MOMO_IPN_URL || 'http://localhost:3000/payment/ipn';
            const extraData = `${invoice_id}_${user_id}`;; // Use invoice_id for tracking
            const autoCapture = true;
            const lang = 'vi';
            
            const amount = Math.round(total_price).toString();
            const orderId = `${order_id}_${Date.now()}`;
            const requestId = `${order_id}_${Date.now()}`; // Make unique
            const orderGroupId = '';
            const partnerName = process.env.MOMO_PARTNER_NAME || 'Test';
            const storeId = process.env.MOMO_STORE_ID || 'MomoTestStore';
            
            // 6. Create signature
            const rawSignature =
                `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}` +
                `&orderId=${orderId}&orderInfo=${orderInfoStr}&partnerCode=${partnerCode}` +
                `&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
            
            const signature = crypto.createHmac('sha256', secretKey)
                .update(rawSignature)
                .digest('hex');
            
            // 7. Prepare request body
            const requestBody = {
                partnerCode,
                partnerName,
                storeId,
                requestId,
                amount,
                orderId,
                orderInfo: orderInfoStr,
                redirectUrl,
                ipnUrl,
                lang,
                requestType,
                autoCapture,
                extraData,
                orderGroupId,
                signature
            };
            
            const response = await axios.post(
                'https://test-payment.momo.vn/v2/gateway/api/create',
                requestBody,
                { 
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 30000 // 30 seconds timeout
                }
            );
            
            if (response.data.resultCode !== 0) {
                throw new Error(`MoMo API Error: ${response.data.message || 'Unknown error'}`);
            }
            
            await cartService.deleteCartByUser(user_id);
            
            return {
                ...response.data,
                order_id: orderId,
                invoice_id: invoice_id
            };
            
        } catch (error) {
            console.error('Error in payMoMo:', error);
            throw error;
        }
    }
}