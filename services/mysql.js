'use strict';

const env = require('dotenv');
env.config();

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: `${process.env.MYSQL_USERNAME}`,
    password: `${process.env.MYSQL_PASSWORD}`,
    database: `${process.env.MYSQL_DATABASE}`
})

module.exports = pool.promise();