const { Items } = require("../models/warehouse.models");


const getItems = async (req, res = response) => {

    try {
        const items = await Items.findAll({
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
    res.json({
        msg: 'additem',
    })
}
const updateItem = async (req, res = response) => {
    res.json({
        msg: 'updateitem',
    })
}
const deleteItem = async (req, res = response) => {
    res.json({
        msg: 'deleteitem',
    })
}


module.exports = {
    getItems,
    addItem,
    updateItem,
    deleteItem,
}