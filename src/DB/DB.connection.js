const mysql = require('mysql');
const dotEnv = require('dotenv').config();
const env = dotEnv['parsed']['NODE_ENV'] || 'development';
const config = require('../config/DBconfig.json')[env];

const db = mysql.createConnection(config);

const connectToDB = async()=>{
    db.connect((err)=>{
        if(err) throw err;
        console.log('Connected to db');
    })
};
connectToDB()
module.exports ={ db }