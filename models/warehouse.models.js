const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const Item = db.define("item", {

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
    active: {
        type: DataTypes.BOOLEAN
    }

});

module.exports = {
    Item
}