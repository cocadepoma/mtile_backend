const { Event_Operations, Event_Clocks, Event_Items } = require("../models/event.models");

// Fetch events_operations by eventId
const getOperationsById = async (id) => {
	const events_operations = await Event_Operations.findAll({
		where: {
			eventId: id,
		},
		attributes: {
			exclude: ["updatedAt", "createdAt"],
		},
		raw: true,
	});

	return events_operations;
};

// Fetch clocks_operations by eventId
const getClocksById = async (id) => {
	const events_clocks = await Event_Clocks.findAll({
		where: {
			eventId: id,
		},
		attributes: {
			exclude: ["updatedAt", "createdAt"],
		},
		raw: true,
	});

	return events_clocks;
};

// Fetch clocks_operations by eventId
const getMaterialsById = async (id) => {
	const events_materials = await Event_Items.findAll({
		where: {
			eventId: id,
		},
		attributes: {
			exclude: ["updatedAt", "createdAt"],
		},
		raw: true,
	});

	return events_materials;
};

const addPropertiesToEvents = async (events) => {
	const [ops, cls, mats] = ["operations", "clocks", "materials"];

	let newEvents = await addNewProperties(events, ops);
	newEvents = await addNewProperties(newEvents, cls);
	newEvents = await addNewProperties(newEvents, mats);

	return newEvents;
};

const addNewProperties = async (events, type) => {
	const newEvents = await Promise.all(
		events.map(async (e) => {
			const { id } = e;

			switch (type) {
				case "operations":
					const operations = await getOperationsById(id);

					if (operations.length > 0) {
						return {
							...e,
							operations: [...operations],
						};
					} else {
						return {
							...e,
							operations: [],
						};
					}

				case "clocks":
					const clocks = await getClocksById(id);

					if (clocks.length > 0) {
						return {
							...e,
							clocks: [...clocks],
						};
					} else {
						return {
							...e,
							clocks: [],
						};
					}

				case "materials":
					const materials = await getMaterialsById(id);

					if (materials.length > 0) {
						return {
							...e,
							materials: [...materials],
						};
					} else {
						return {
							...e,
							materials: [],
						};
					}

				default:
					return [];
			}
		})
	);

	return newEvents;
};

module.exports = {
	addPropertiesToEvents,
};
