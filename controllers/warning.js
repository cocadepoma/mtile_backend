const { response } = require("express")
const { Warning } = require('../models/warning.models');


const getWarnings = async (req, res = response) => {

    try {
        const warnings = await Warning.findAll({
            attributes: {
                exclude: ['updatedAt']
            },
            order: [['createdAt', 'DESC']]
        });

        if (warnings) {
            res.json({
                warnings
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }

}


const addWarning = async (req, res = response) => {

    try {

        const { description } = req.body;

        const { updatedAt, createdAt, ...warning } = await Warning.create({ description });

        res.status(201).json({
            warning
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }

}


const deleteWarning = async (req, res = response) => {

    const { id } = req.params;

    if (id) {

        try {
            const warning = await Warning.findByPk(id);

            if (warning) {

                const destroyed = await warning.destroy();

                res.json({
                    destroyed
                });
            } else {
                res.status(404).json({
                    msg: 'The id is not valid'
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error, contact with the administrator'
            });
        }

    } else {
        res.status(404).json({
            msg: 'The id must be provided'
        });
    }
}

module.exports = {
    getWarnings,
    addWarning,
    deleteWarning,
}