const { pool } = require('../user_db');
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize( pool.options.connectionString, {dialect: "mysql",});

const User = sequelize.define("User",{
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "user_table",
    timestamps: false,
});


module.exports = User;