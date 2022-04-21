'use strict';

const mysqlService = require('../services/mysql');

const findAll = () => {
    return mysqlService.execute(`SELECT * FROM credential`);
}

const findCredentialByUserNameAndPassword = (userName, password) => {
    return mysqlService.execute(`SELECT * FROM credential WHERE credential_username = '${userName}' AND credential_password = '${password}'`);
}

module.exports = {
    findAll,
    findCredentialByUserNameAndPassword,
}