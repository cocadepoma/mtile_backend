const { response } = require("express");
const { Technician } = require("../models/crew.models");


const getTechnicians = async (req, res = response) => {

    try {

        const technicians = await Technician.findAll({
            raw: true,
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            where: {
                active: true
            }
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


const addTechnician = async (req, res = response) => {

    try {
        const technicianData = req.body;

        const dni = technicianData?.identityDocument;

        const techExist = await Technician.findOne({
            where: {
                identityDocument: dni
            }
        })

        if (techExist) {
            return res.status(409).json({
                msg: 'Technician DNI already exists'
            });
        }

        const technician = await Technician.create({ ...technicianData });

        res.json({
            technician
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }

}
const updateTechnician = async (req, res = response) => {

    try {
        const { id } = req.params;
        const technicianData = req.body;

        await Technician.update({ ...technicianData }, {
            where: {
                id
            }
        });

        const technician = await Technician.findByPk(id);

        res.json({
            technician
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }

}
const deleteTechnician = async (req, res = response) => {

    try {
        const { id } = req.params;

        await Technician.update({ active: false }, {
            where: {
                id
            }
        });

        const technician = await Technician.findByPk(id);

        res.json({
            technician
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }

}
module.exports = {
    getTechnicians,
    addTechnician,
    updateTechnician,
    deleteTechnician,
}