const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const Items = db.define("items", {

    code: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    minStock: {
        type: DataTypes.INTEGER
    },
    place: {
        type: DataTypes.STRING
    },

});

module.exports = {
    Items
}