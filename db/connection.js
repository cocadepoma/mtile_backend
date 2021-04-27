const { Sequelize } = require('sequelize');

const db = new Sequelize("mtile", "root", "", {
    host: "localhost",
    dialect: "mariadb",
    //logging: false // Cada comando que se haga impacta en la consola
});

module.exports = db;