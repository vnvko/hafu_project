const mysql = require('mysql2/promise');

// Fallback cấu hình an toàn cho môi trường dev nếu thiếu biến môi trường
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hafu',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

// Health check 1 lần khi khởi động để phát hiện lỗi kết nối sớm (tránh loop gây tốn RAM)
pool
  .query('SELECT 1')
  .then(() => {
    console.log('✅ MySQL connected:', `${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
  })
  .catch((err) => {
    console.error('❌ MySQL connection failed:', err.message);
  });

module.exports = pool;
