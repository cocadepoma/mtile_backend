const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const Factory = db.define("factory", {
	name: {
		type: DataTypes.STRING,
	},
});

const Section = db.define("section", {
	name: {
		type: DataTypes.STRING,
	},
	factoryId: {
		type: DataTypes.INTEGER,
	},
});

const Numbers = db.define("number", {
	number: {
		type: DataTypes.STRING,
	},
	sectionId: {
		type: DataTypes.INTEGER,
	},
});

const Machine = db.define("machine", {
	name: {
		type: DataTypes.STRING,
	},
	numberId: {
		type: DataTypes.INTEGER,
	},
});

const Doc = db.define("doc", {
	name: {
		type: DataTypes.STRING,
	},
	info: {
		type: DataTypes.STRING,
	},
	sectionId: {
		type: DataTypes.INTEGER,
	},
});

module.exports = {
	Factory,
	Section,
	Numbers,
	Machine,
	Doc,
};
