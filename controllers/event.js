const { response } = require("express");
const { Event, Type, Breakdown } = require("../models/event.models");

const { addPropertiesToEvents } = require("../helpers/db_helpers");

// ENDPOINT /api/events/events
const getEvents = async (req, res = response) => {

	try {
		const events = await Event.findAll({
			raw: true,
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
			order: [['start', 'DESC']]
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
};
