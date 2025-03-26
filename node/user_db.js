require('dotenv').config();
const { Pool} = require('pg');

const poolUser = new Pool({
    connectionString: String(process.env.DATABASE_URL),
});
module.exports = poolUser;

