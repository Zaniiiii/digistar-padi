// db.js

const mysql = require('mysql2/promise');

// Buat koneksi pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'dayak1352', // Password MySQL Anda
  database: 'ecommerce_db',
});

module.exports = pool;