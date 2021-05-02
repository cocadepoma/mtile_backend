const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const Warning = db.define("warning", {
    description: {
        type: DataTypes.STRING,
    },
});

module.exports = {
    Warning
}