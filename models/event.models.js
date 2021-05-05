const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const Breakdown = db.define("breakdown", {
    name: {
        type: DataTypes.STRING,
    },
});

const Type = db.define("type", {
    name: {
        type: DataTypes.STRING,
    },
});

const Event = db.define("event", {
    factory: {
        type: DataTypes.INTEGER,
    },
    section: {
        type: DataTypes.INTEGER,
    },
    machine: {
        type: DataTypes.INTEGER,
    },
    number: {
        type: DataTypes.INTEGER,
    },
    technician: {
        type: DataTypes.INTEGER,
    },
    worker: {
        type: DataTypes.STRING,
    },
    orderType: {
        type: DataTypes.INTEGER,
    },
    breakdown: {
        type: DataTypes.INTEGER,
    },
    closed: {
        type: DataTypes.TINYINT,
    },
    confirmed: {
        type: DataTypes.TINYINT,
    },
    active: {
        type: DataTypes.TINYINT,
    },
    start: {
        type: DataTypes.DATE,
    },
    end: {
        type: DataTypes.DATE,
    },
    startFix: {
        type: DataTypes.DATE,
    },
    endFix: {
        type: DataTypes.DATE,
    },
    totalMins: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.TEXT,
    },
});

const Event_Operations = db.define("events_operations", {
    eventId: {
        type: DataTypes.INTEGER,
    },
    time: {
        type: DataTypes.FLOAT,
    },
    operation: {
        type: DataTypes.STRING,
    },
});

const Event_Clocks = db.define("events_clocks", {
    eventId: {
        type: DataTypes.INTEGER,
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    user: {
        type: DataTypes.STRING,
    },
    start: {
        type: DataTypes.DATE,
    },
    end: {
        type: DataTypes.DATE,
    },
});

const Event_Items = db.define("events_items", {
    eventId: {
        type: DataTypes.INTEGER,
    },
    code: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
});

module.exports = {
    Event,
    Breakdown,
    Type,
    Event_Operations,
    Event_Clocks,
    Event_Items,
};
