const { Op } = require("sequelize");
const { Item } = require("../models/warehouse.models");


const getItems = async (req, res = response) => {

    try {
        const items = await Item.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        res.json({
            items
        });

    } catch (error) {
        console.log(error);
        res.status(500).status({
            msg: 'Error, contact with the administrator'
        });
    }

}

const addItem = async (req, res = response) => {

    const { code, description } = req.body;

    try {
        const item = await Item.findOne({
            where: {
                [Op.or]: [
                    { code },
                    { description }
                ]
            }
        });

        if (item) {
            return res.status(400).json({
                msg: 'Error, An item already exists with the code or description provided'
            });
        }

        const savedItem = await Item.create(req.body);

        res.json({
            savedItem
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error, contact with the administrator'
        });
    }

}
const updateItem = async (req, res = response) => {

    const data = req.body;
    const { id } = req.params;

    if (id) {

        try {
            const item = await Item.findByPk(id);

            if (!item) {
                return res.status(404).json({
                    msg: `Error, the item with the id: ${id} doesn't exists`
                });
            }

            await Item.update({ ...data }, {
                where: {
                    id
                },
            });

            const newItem = await Item.findByPk(id);

            res.json({
                newItem
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error, contact with the administrator'
            });
        }
    } else {
        res.status(400).json({
            msg: 'Error, the ID must be provided'
        });
    }

}

const deleteItem = async (req, res = response) => {

    const { id } = req.params;

    if (id) {

        try {
            const item = await Item.findByPk(id);

            if (!item) {
                return res.status(404).json({
                    msg: `Error, the item with the id: ${id} doesn't exists`
                });
            }

            await Item.update({ active: false }, {
                where: {
                    id
                },
            });

            const newItem = await Item.findByPk(id);

            res.json({
                newItem
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error, contact with the administrator'
            });
        }
    } else {
        res.status(400).json({
            msg: 'Error, the ID must be provided'
        });
    }

}


const subtractItem = async (req, res = response) => {

    const { quantity } = req.body;
    const { id: code } = req.params;

    if (code) {

        try {
            const item = await Item.findOne({ where: { code } });

            if (!item) {
                return res.status(404).json({
                    msg: `Error, the item with the code: ${code} doesn't exists`
                });
            }

            const finalQuantity = item.quantity - quantity;

            await Item.update({ quantity: finalQuantity }, {
                where: {
                    code
                },
            });

            const newItem = await Item.findOne({ where: { code } });

            res.json({
                newItem
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error, contact with the administrator'
            });
        }
    } else {
        res.status(400).json({
            msg: 'Error, the ID must be provided'
        });
    }

}

module.exports = {
    getItems,
    addItem,
    updateItem,
    deleteItem,
    subtractItem
}