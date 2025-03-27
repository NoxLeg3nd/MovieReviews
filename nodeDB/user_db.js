require('dotenv').config({path: '../.env'});

const { Pool } = require('pg'); // Import Pool from pg instead of Client

// Set up the Pool with environment variables
const pool = new Pool({
    connectionString: String(process.env.URL),
});

module.exports = { pool }; // Export pool instead of client