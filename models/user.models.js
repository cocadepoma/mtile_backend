const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const User = db.define('user', {

    name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    admin: {
        type: DataTypes.BOOLEAN
    },
    active: {
        type: DataTypes.BOOLEAN
    },

});

module.exports = User;
