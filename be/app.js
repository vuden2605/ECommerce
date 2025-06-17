const express = require('express');
const path = require('path');
const { connectDB } = require('./config/db.config'); // ✅ Kết nối DB
const router = require('./routes/index.routes'); 
const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB(); 
    app.use(express.static(path.join(__dirname, '../fe')));
    app.use(express.json());

    // ✅ Route chính
    app.use('/', router);

    // ❌ Route không tồn tại (404)
    app.use((req, res, next) => {
      console.error(`❌ Not found: ${req.method} ${req.originalUrl}`);
      res.status(404).json({ error: 'Not found' });
    });

    // ❗ Middleware xử lý lỗi
    app.use((err, req, res, next) => {
      console.error('❗ Internal Error:', err);
      res.status(500).json({ error: 'An internal server error occurred.' });
    });

    // ✅ Lắng nghe server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1); // Thoát nếu lỗi
  }
})();
