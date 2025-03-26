const { Client } = require('pg');
const client = new Client({
    user : "postgres",
    password : "123437",
    port: 5432,
    database : "user_db"
})
client.connect();