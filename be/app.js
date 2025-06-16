const express = require('express');
const { connectDB } = require('./config/db.config');
const app = express();
const PORT = 3000;

app.use(express.json());

// Kết nối đến cơ sở dữ liệu
connectDB()
// Route mặc định
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
