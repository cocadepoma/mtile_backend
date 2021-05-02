
const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Doc = db.define("doc", {

    name: {
        type: DataTypes.STRING
    },
    info: {
        type: DataTypes.STRING
    },
    section: {
        type: DataTypes.INTEGER
    }
});

module.exports = { Doc };