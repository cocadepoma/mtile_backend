const { response } = require("express");
const User = require("../models/user.models");
const bcrypt = require('bcrypt');
const { generateJWT } = require("../helpers/generate_jwt");

const loginUser = async (req, res = response) => {

    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.findOne({
            email
        });

        // Check if the password is correct
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password incorrecto",
            });
        }

        // Generate Json Web Token JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token: token,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
}

const renewToken = async (req, res = response) => {

    const {
        uid,
        name
    } = req;

    // Generar Json Web Token JWT
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    });

};


const getUsers = async (req, res = response) => {

    try {

        const users = await User.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        res.json({
            users
        });

    } catch (error) {
        console.log(error);
        res.status(500).status({
            msg: 'Error, contact with the administrator'
        });
    }

}

const addUser = async (req, res = response) => {

    const { name, email, password: passwordReq } = req.body;

    if (name.length < 4) {
        return res.status(400).json({
            msg: 'The password must be at least 4 characters'
        });
    }

    if (passwordReq.length < 6) {
        return res.status(400).json({
            msg: 'The password must be at least 6 characters'
        });
    }

    try {

        const salt = bcrypt.genSaltSync();
        const password = await bcrypt.hash(passwordReq, salt);

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).status({
            msg: 'Error, contact with the administrator'
        });
    }
}

const updateUser = async (req, res = response) => {

    const { id } = req.params;
    const { name, email, password: passwordReq } = req.body;

    if (!id) {
        return res.status(400).json({
            msg: 'The id must be provided'
        });
    }

    if (name.length < 4) {
        return res.status(400).json({
            msg: 'The password must be at least 4 characters'
        });
    }

    if (passwordReq.length < 6) {
        return res.status(400).json({
            msg: 'The password must be at least 6 characters'
        });
    }

    try {
        const salt = bcrypt.genSaltSync();
        const password = await bcrypt.hash(passwordReq, salt);

        const user = await User.update({
            name,
            email,
            password
        },
            {
                where: {
                    id
                }
            });

        res.status(200).json({
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).status({
            msg: 'Error, contact with the administrator'
        });
    }
}


const deleteUser = async (req, res = response) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            msg: 'The id must be provided'
        });
    }

    try {
        const user = await User.update(
            {
                active: false
            }, { where: { id } });

        res.status(200).json({
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).status({
            msg: 'Error, contact with the administrator'
        });
    }

}



module.exports = {
    loginUser,
    renewToken,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
}