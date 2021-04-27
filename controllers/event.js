const { response } = require("express");
const { Event, Type, Breakdown, Event_Operations } = require("../models/event.models");


const getEvents = async (req, res = response) => {

    try {
        const events = await Event.findAll({
            raw: true,
            attributes: [
                'id',
                'factory',
                'section',
                'machine', 'number',
                'technician',
                'worker',
                'orderType',
                'breakdown',
                'closed',
                'confirmed',
                'start',
                'end',
                'startFix',
                'endFix',
                'totalMins',
                'description'
            ]
        });


        transformEvents(events).then(events => {
            res.json({
                events
            });
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error, hable con el administrador'
        });
    }

}

const getTypes = async (req, res = response) => {

    try {
        const types = await Type.findAll({
            attributes: ['id', 'name']
        });

        res.json({
            types
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error, hable con el administrador'
        });
    }
}

const getBreakdowns = async (req, res = response) => {

    try {
        const breakdowns = await Breakdown.findAll({
            attributes: ['id', 'name']
        });

        res.json({
            breakdowns
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error, hable con el administrador'
        });
    }

}

const getOperationsById = async (id) => {

    const events_operations = await Event_Operations.findAll({
        where: {
            eventId: id
        }, raw: true
    });

    return events_operations;

}

const transformEvents = async (events) => {
    return Promise.all(

        events.map(async (e) => {

            const { id } = e;
            const operations = await getOperationsById(id);

            if (operations.length > 0) {
                return ({
                    ...e,
                    operations: [...operations]
                });
            } else {
                return ({
                    ...e,
                    operations: []
                });
            }

        })
    )
}

module.exports = {
    getEvents,
    getTypes,
    getBreakdowns,
}