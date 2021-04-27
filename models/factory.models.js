
const { DataTypes } = require('sequelize');
const db = require('../db/connection');


const Factory = db.define('Factory', {

    name: {
        type: DataTypes.STRING
    },

});

const Section = db.define('Section', {

    name: {
        type: DataTypes.STRING
    },
    factoryId: {
        type: DataTypes.INTEGER
    }

});

const Numbers = db.define('Number', {

    number: {
        type: DataTypes.STRING
    },
    sectionId: {
        type: DataTypes.INTEGER
    }

});

const Machine = db.define('Machine', {

    name: {
        type: DataTypes.STRING
    },
    numberId: {
        type: DataTypes.INTEGER
    }

});

const Doc = db.define('Doc', {

    name: {
        type: DataTypes.STRING
    },
    info: {
        type: DataTypes.STRING
    },
    sectionId: {
        type: DataTypes.INTEGER
    }

});

module.exports = {
    Factory,
    Section,
    Numbers,
    Machine,
    Doc
};
