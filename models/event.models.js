
const { DataTypes } = require('sequelize');
const db = require('../db/connection');


const Breakdown = db.define('Breakdown', {

    name: {
        type: DataTypes.STRING
    },

});

const Type = db.define('Type', {

    name: {
        type: DataTypes.STRING
    },

});

const Event = db.define('Event', {

    factory: {
        type: DataTypes.INTEGER
    },
    section: {
        type: DataTypes.INTEGER
    },
    machine: {
        type: DataTypes.INTEGER
    },
    number: {
        type: DataTypes.INTEGER
    },
    technician: {
        type: DataTypes.INTEGER
    },
    worker: {
        type: DataTypes.STRING
    },
    orderType: {
        type: DataTypes.INTEGER
    },
    breakdown: {
        type: DataTypes.INTEGER
    },
    closed: {
        type: DataTypes.TINYINT
    },
    confirmed: {
        type: DataTypes.TINYINT
    },
    start: {
        type: DataTypes.DATE
    },
    end: {
        type: DataTypes.DATE
    },
    startFix: {
        type: DataTypes.DATE
    },
    endFix: {
        type: DataTypes.DATE
    },
    totalMins: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.TEXT
    },

});

const Event_Operations = db.define('Events_Operations', {
    eventId: {
        type: DataTypes.INTEGER
    },
    time: {
        type: DataTypes.INTEGER
    },
    operation: {
        type: DataTypes.STRING
    }

});



module.exports = {
    Event,
    Breakdown,
    Type,
    Event_Operations
};
