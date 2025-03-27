
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
   try{
       const {username , email , password} = req.body;
       if(!username || !email || !password){
           return res.status(403).send('Username and password are required');
       }
       const checkUsername = await usermodel.findAll({
           where: {
               username: req.body.username,
           }
       });
       const checkEmail = await usermodel.findAll({
           where: {
               email: req.body.email
           }
       });

       if(checkUsername.length > 0){
           return res.status(400).send("Username is already taken!")
       }else if(checkEmail.length > 0){
           return res.status(401).send("Email is already taken!");
       }
       let user = await usermodel.create(req.body);
       await user.save();
       return res.sendStatus(201).send(user);

   }catch (e) {
       console.log("e = " + e.message);
   }
});

/*app.post('/api/v1/signUp',async (req, res) => {
    try{
        const user = {
            username: req.body.username,
            email : req.body.email,
            password: req.body.password,
        }
        console.log(user);
        const checkEmail = pool.query('Select email from user_table where email = $1 ', [user.email]);
        const checkUsername = pool.query('Select username from user_table where username = $1 ', [user.username]);
        if(req.body.email === checkEmail) {
            return res.status(400).json({ error: 'Email already taken' });
        } else if ( req.body.username === checkUsername){
            return res.status(402).json({ error: 'Email already taken' });
        }

        const insertQuery = 'INSERT INTO user_table (username,email, password) VALUES ($1, $2,$3) RETURNING *';
        const insertValues = [req.body.username,req.body.email, req.body.password, ];
        const insertResult = await pool.query(insertQuery, insertValues);


        res.status(201).json({
            message: 'User registered successfully',
            user: insertResult.rows[0], // Return the user object (without password)
        });
    }
    catch(e){
        console.error(e);
        res.status(401).send({'Invalid data': true});
    }

})*/


//===================Server=========================
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
