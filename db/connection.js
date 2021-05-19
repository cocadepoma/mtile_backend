const { Sequelize } = require('sequelize');

// const db = new Sequelize("mtile", "root", "", {
//     host: "localhost",
//     dialect: "mariadb",
//     logging: false // Cada comando que se haga impacta en la consola
// });

// module.exports = db;

// HEROKU
const db = new Sequelize("heroku_fc7036c98d559b6", "bf266cfd38263e", "18507f44", {
    host: "us-cdbr-east-03.cleardb.com",
    dialect: "mariadb",
    logging: false // Cada comando que se haga impacta en la consola
});

module.exports = db;

// mysql://bf266cfd38263e:18507f44@us-cdbr-east-03.cleardb.com/heroku_fc7036c98d559b6?reconnect=true
//user bf266cfd38263e
//password 18507f44