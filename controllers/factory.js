const { Factory, Section, Numbers, Machine, Doc } = require("../models/factory.models");


const getFactories = async (req, res = response) => {

    try {
        const factories = await Factory.findAll({
            attributes: ['id', 'name']
        });

        res.json({
            factories
        });
    } catch (error) {
        console.log(error);
        res.status(500).status({
            msg: 'Error, contact with the administrator'
        });
    }

}

const getSections = async (req, res = response) => {

    try {
        const sections = await Section.findAll({
            attributes: ['id', 'name', 'factoryId']
        });
        res.json({
            sections
        });
    } catch (error) {
        console.log(error);
        res.status(500).status({
            msg: 'Error, contact with the administrator'
        });
    }

}

const getNumbers = async (req, res = response) => {
    try {
        const numbers = await Numbers.findAll({
            attributes: ['id', 'number', 'sectionId']
        });
        res.json({
            numbers
        });
    } catch (error) {
        console.log(error);
        res.status(500).status({
            msg: 'Error, contact with the administrator'
        });
    }
}

const getMachines = async (req, res = response) => {
    try {
        const machines = await Machine.findAll({
            attributes: ['id', 'name', 'numberId']
        });
        res.json({
            machines
        });
    } catch (error) {
        console.log(error);
        res.status(500).status({
            msg: 'Error, contact with the administrator'
        });
    }
}

const getDocs = async (req, res = response) => {
    try {
        const docs = await Doc.findAll({
            attributes: ['id', 'name', 'info', 'sectionId']
        });
        res.json({
            docs
        });
    } catch (error) {
        console.log(error);
        res.status(500).status({
            msg: 'Error, contact with the administrator'
        });
    }
}


module.exports = {
    getFactories,
    getSections,
    getNumbers,
    getMachines,
    getDocs,
}