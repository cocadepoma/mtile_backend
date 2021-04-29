const { DataTypes } = require("sequelize");
const db = require("../db/connection");


const Technicians = db.define("technicians", {

    name: {
        type: DataTypes.STRING
    },
    surname: {
        type: DataTypes.STRING
    },
    birthDate: {
        type: DataTypes.DATE
    },
    identityDocument: {
        type: DataTypes.STRING
    },
    phoneNumber: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    notes: {
        type: DataTypes.TEXT
    },
    schedule: {
        type: DataTypes.STRING
    },
    factory: {
        type: DataTypes.INTEGER
    },

});

module.exports = {
    Technicians
}
