const { response } = require("express");
const { Technician } = require("../models/crew.models");
const User = require("../models/user.models");
const { Factory, Section, Numbers, Machine } = require("../models/factory.models");
const { Event, Breakdown, Type } = require("../models/event.models");


// This middleware checks if an user exists in the database with an ID
const userIdExists = async (req, res = response, next) => {
    const { id } = req.params;

    if (id) {

        try {
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    msg: 'The id provided does not exist'
                });
            }

            next();

        } catch (error) {

            console.log(error);
            return res.status(500).json({
                msg: 'Error, contact with the administrator'
            });
        }

    } else {

        return res.status(400).json({
            msg: 'There is not an id provided'
        });

    }
}

// This Middleware checks if and Email exist or not in the DB
// depending on the route path origin.
const userEmailExists = async (req, res = response, next) => {

    const { email } = req.body;
    const { path } = req.route;

    if (email) {

        try {

            const user = await User.findOne({ where: { email } });

            switch (path) {

                // If the path is new, is a register
                case '/new':
                    if (user) {
                        return res.status(409).json({
                            msg: 'The user email already exists'
                        });
                    }
                    break;

                // If the path is /, is a login
                case '/':
                    if (!user) {
                        return res.status(404).json({
                            msg: 'The user email does not exist'
                        });
                    }
                    break;

                default:
                    return res.status(500).json({
                        msg: 'Error, contact with the administrator'
                    });
            }

            next();

        } catch (error) {
            console.log(error);
            if (user) {
                return res.status(500).json({
                    msg: 'Error, contact with the administrator'
                });
            }
        }

    } else {

        return res.status(404).json({
            msg: 'There is not and email provided'
        });

    }
}

const technicianIdExists = async (req, res = response, next) => {

    const { path } = req.route;
    let { id } = req.params;


    if (path.includes('events')) {
        id = req.body.technician;
    }

    if (!id) {
        res.status(400).json({
            msg: 'There is not an id provided'
        });
    }

    try {

        const technician = await Technician.findByPk(id);

        if (!technician) {
            return res.status(404).json({
                msg: 'No technician found with the id ' + id
            });
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }

}

const factoryIdExists = async (req, res = response, next) => {

    const { factory: id } = req.body;

    try {

        const factory = await Factory.findOne({
            where: {
                id
            }
        });

        if (!factory) {
            return res.status(404).json({
                msg: 'The factory ID does not exist'
            });
        }

        next();

    } catch (error) {
        console.log(object);
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }

}
const sectionIdExists = async (req, res = response, next) => {

    const { section: id } = req.body;

    try {

        const section = await Section.findOne({
            where: {
                id
            }
        });

        if (!section) {
            return res.status(404).json({
                msg: 'The section ID does not exist'
            });
        }

        next();

    } catch (error) {
        console.log(object);
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }

}
const machineIdExists = async (req, res = response, next) => {

    const { machine: id } = req.body;

    try {

        const machine = await Machine.findOne({
            where: {
                id
            }
        });

        if (!machine) {
            return res.status(404).json({
                msg: 'The machine ID does not exist'
            });
        }

        next();

    } catch (error) {
        console.log(object);
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }

}
const numberIdExists = async (req, res = response, next) => {

    const { number: id } = req.body;

    try {

        const number = await Numbers.findOne({
            where: {
                id
            }
        });

        if (!number) {
            return res.status(404).json({
                msg: 'The number ID does not exist'
            });
        }

        next();

    } catch (error) {
        console.log(object);
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }

}

const orderTypeIdExists = async (req, res = response, next) => {

    const { orderType: id } = req.body;

    try {

        const type = await Type.findOne({
            where: {
                id
            }
        });

        if (!type) {
            return res.status(404).json({
                msg: 'The type ID does not exist'
            });
        }

        next();

    } catch (error) {
        console.log(object);
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }

}
const breakdownIdExists = async (req, res = response, next) => {

    const { breakdown: id } = req.body;

    try {

        const breakdown = await Breakdown.findOne({
            where: {
                id
            }
        });

        if (!breakdown) {
            return res.status(404).json({
                msg: 'The breakdown ID does not exist'
            });
        }

        next();

    } catch (error) {
        console.log(object);
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }

}

const eventIdExists = async (req, res = response, next) => {

    try {
        const { id } = req.params;

        if (id) {

            const event = await Event.findOne({
                where: {
                    id
                }
            });

            if (!event) {
                return res.status(404).json({
                    msg: `There are not events with the id: ${id}`
                });
            }

            next();
        } else {
            return res.status(400).json({
                msg: 'ID not found on the request'
            });
        }
    } catch (error) {
        console.log(object);
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }



}

module.exports = {

    userIdExists,
    userEmailExists,
    technicianIdExists,
    factoryIdExists,
    sectionIdExists,
    machineIdExists,
    numberIdExists,
    orderTypeIdExists,
    breakdownIdExists,
    eventIdExists,

}