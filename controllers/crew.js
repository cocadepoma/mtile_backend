const { response } = require("express");
const { Technicians } = require("../models/crew.models");


const getTechnicians = async (req, res = response) => {

    try {

        const technicians = await Technicians.findAll({
            raw: true,
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        res.json({
            technicians
        });

    } catch (error) {
        console.log(error);
        res.status(500).status({
            msg: 'Error, contact with the administrator'
        });
    }

}

module.exports = {
    getTechnicians
}