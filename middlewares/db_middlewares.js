const { response } = require("express");
const User = require("../models/user.models");

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

        return res.status(404).json({
            msg: 'There is not and id provided'
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
                        return res.status(403).json({
                            msg: 'The user email already exists'
                        });
                    }
                    break;

                // If the path is /, is a login
                case '/':
                    if (!user) {
                        return res.status(403).json({
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


module.exports = {
    userIdExists,
    userEmailExists
}