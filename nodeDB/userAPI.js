
//===================Import-uri=================================
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const { pool } = require('./user_db');
const app = express();
const usermodel  = require('./models/UserModel'); //PT sequlize
const port = 3000;
//trebuie modificat
//================Setari Aplicatie==================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//========Sequlize initialization===========================================================
const sequelize = new Sequelize(pool.options.connectionString, {dialect: 'postgres'});

sequelize.sync();


//=======================API-uri==========================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/signup.html'));
})

app.post('/api/v1/signUp', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(403).json({ error: 'Username and password are required' });
        }

        const checkUsername = await usermodel.findAll({
            where: { username: req.body.username },
        });
        const checkEmail = await usermodel.findAll({
            where: { email: req.body.email }
        });

        if (checkUsername.length > 0) {
            return res.status(400).json({ error: "Username is already taken!" });
        } else if (checkEmail.length > 0) {
            return res.status(401).json({ error: 'Email is already taken!' });
        }

        // Create and save the user
        let user = await usermodel.create(req.body);  // This automatically saves the user

        // Send the response with JSON message only
        return res.status(201).json({ message: 'User created successfully.', user });
    } catch (e) {
        console.log("Error:", e.message);
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
});





//===================Server=========================
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
