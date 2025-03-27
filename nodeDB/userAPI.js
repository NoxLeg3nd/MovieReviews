
//===================Import-uri=================================
const express = require('express');
const path = require('path');
const { pool } = require('./user_db');
const app = express();
const port = 3000;
//trebuie modificat
//================Setari Aplicatie==================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//=======================API-uri==========================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/signup.html'));
})

app.post('/api/v1/signUp',async (req, res) => {
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

})


//===================Server=========================
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
