require('dotenv').config({path: '../.env'});


const { Pool } = require('pg'); // Import Pool from pg instead of Client

// Set up the Pool with environment variables
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, // Changed from `username` to `user` for Pool configuration
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

module.exports = { pool }; // Export pool instead of client