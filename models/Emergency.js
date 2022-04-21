'use strict';

const mysqlService = require('../services/mysql');

const findAll = () => {
    return mysqlService.execute(`SELECT * FROM emergency_call`);
}
 
module.exports = {
    findAll,
}