const { response } = require("express");
const { Event,
	Type,
	Breakdown,
	Event_Operations,
	Event_Clocks,
	Event_Items } = require("../models/event.models");

const { addPropertiesToEvents } = require("../helpers/db_helpers");

const moment = require("moment");
const { Item } = require("../models/warehouse.models");


// ENDPOINT /api/events/events
const getEvents = async (req, res = response) => {

	try {
		const events = await Event.findAll({
			raw: true,
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
			order: [['start', 'DESC']],
			where: { active: true }
		});

		const eventsWithData = await addPropertiesToEvents(events);

		res.json({
			eventsWithData,
		});
	} catch (error) {
		console.log(error);
		res.status(500).status({
			msg: 'Error, contact with the administrator'
		});
	}
};

const addEvent = async (req, res = response) => {

	const eventData = req.body;
	const {
		start,
		end,
		startFix,
		endFix
	} = req.body;

	try {
		if (
			!moment(start).isValid() ||
			!moment(end).isValid() ||
			!moment(startFix).isValid() ||
			!moment(endFix).isValid()
		) {
			return res.status(404).json({
				msg: 'Invalid dates'
			});
		}

		const event = await Event.create({ ...eventData });

		return res.status(201).json({
			event
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error, contact with the administrator'
		});
	}

}


const updateEvent = async (req, res = response) => {

	const { id } = req.params;
	const eventData = req.body;
	const {
		start,
		end,
		startFix,
		endFix,
	} = req.body;

	try {
		if (
			!moment(start).isValid() ||
			!moment(end).isValid() ||
			!moment(startFix).isValid() ||
			!moment(endFix).isValid()
		) {
			return res.status(404).json({
				msg: 'Invalid dates'
			});
		}

		await Event.update({ ...eventData }, {
			where: {
				id
			}
		});

		const event = await Event.findByPk(id);

		return res.json({
			event
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error, contact with the administrator'
		});
	}
}

const removeEvent = async (req, res = response) => {

	try {
		const { id } = req.params;

		await Event.update(
			{
				active: false
			}, { where: { id } });

		const event = await Event.findByPk(id);

		res.json({
			active: event.dataValues.active
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error, contact with the administrator'
		});
	}

}

const addEventOperation = async (req, res = response) => {

	const { id } = req.params;
	const { time, operation } = req.body;

	try {

		const event_operation = await Event_Operations.create(
			{ eventId: id, time, operation });

		res.status(201).json({
			new_operation: event_operation
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error, contact with the administrator'
		});
	}
}

const addEventClock = async (req, res = response) => {

	const { id } = req.params;
	const { userId, start, end, user } = req.body;

	try {

		if (!moment(start).isValid() || !moment(end).isValid()) {
			return res.status(400).json({
				msg: 'Dates are invalid'
			});
		}

		const event_clock = await Event_Clocks.create(
			{ eventId: id, userId, user, start, end });

		res.status(201).json({
			new_operation: event_clock
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error, contact with the administrator'
		});
	}
}


const addEventItem = async (req, res = response) => {

	const { id } = req.params;
	const { code, description, quantity } = req.body;

	try {

		const data = { eventId: id, code, description, quantity };

		const event_material = await Event_Items.create(data);

		res.status(201).json({
			new_operation: event_material
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error, contact with the administrator'
		});
	}
}


const deleteEventOperation = async (req, res = response) => {

	const { id: eventId } = req.params;

	try {

		const deleted = await Event_Operations.destroy({ where: { eventId } });

		if (deleted) {
			res.json({
				ok: true
			});
		} else {
			res.json({
				ok: false,
				msg: 'The operation was not eliminated'
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error, contact with the administrator'
		});
	}
}
const deleteEventItem = async (req, res = response) => {
	const { id: eventId } = req.params;

	try {

		const deleted = await Event_Items.destroy({ where: { eventId } });

		if (deleted) {
			res.json({
				ok: true
			});
		} else {
			res.json({
				ok: false,
				msg: 'The operation was not eliminated'
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error, contact with the administrator'
		});
	}
}
const deleteEventClock = async (req, res = response) => {
	const { id: eventId } = req.params;

	try {

		const deleted = await Event_Clocks.destroy({ where: { eventId } });

		if (deleted) {
			res.json({
				ok: true
			});
		} else {
			res.json({
				ok: false,
				msg: 'The operation was not eliminated'
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Error, contact with the administrator'
		});
	}
}


// ENDPOINT /api/events/types
const getTypes = async (req, res = response) => {
	try {
		const types = await Type.findAll({
			attributes: ["id", "name"],
		});

		res.json({
			types,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Error, hable con el administrador",
		});
	}
};

// ENDPOINT /api/events/breakdowns
const getBreakdowns = async (req, res = response) => {
	try {
		const breakdowns = await Breakdown.findAll({
			attributes: ["id", "name"],
		});

		res.json({
			breakdowns,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Error, hable con el administrador",
		});
	}
};

module.exports = {
	getEvents,
	getTypes,
	getBreakdowns,
	addEvent,
	updateEvent,
	removeEvent,
	addEventOperation,
	addEventClock,
	addEventItem,
	deleteEventOperation,
	deleteEventItem,
	deleteEventClock,
};
