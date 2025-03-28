
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
app.use('/assets', express.static(path.join(__dirname, '../assets')));

//========Sequlize initialization===========================================================
const sequelize = new Sequelize(pool.options.connectionString, {dialect: 'postgres'});

sequelize.sync();


//=======================API-uri==========================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/login.html'));
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

app.post('/api/v1/login', async (req, res) => {
    try {
        const {email , password} = req.body;
        if(!email || !password) {
            return res.status(405).send('Email and password are required');
        }
        const checkEmail = await usermodel.findAll({
            where: {
                email: req.body.email,
            }
        });
        const checkPassword = await usermodel.findAll({
            where: {
                password: req.body.password,
            }
        });
        if(checkEmail.length === 0 || checkPassword.length === 0) {
            return res.status(406).send("Email or password are incorrect!");
        }
        if(checkEmail.length > 0 && checkPassword.length > 0){
            return res.status(200).send("Email and password are correct!");
        }
    } catch (e) {
        console.log("e = " + e.message);
    }
})

//===================Server=========================
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
