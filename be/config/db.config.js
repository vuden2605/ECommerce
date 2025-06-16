require('dotenv').config();
const sql = require('mssql');
const SECONDS = 1000;
const MINUTES = 60 * SECONDS;
console.log("DB_HOST:", process.env.DB_HOST);
// Cấu hình kết nối
const config = {
  server: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true 
  },
  connectionTimeout: 10* SECONDS, 
  requestTimeout: 1 * MINUTES

};

// Hàm kết nối
const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log('✅ Connected to MS SQL Server');
  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
};

module.exports = {
  connectDB,
  sql
};