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
            where: {
                email,
                active: true
            }
        });

        if (!user) {
            return res.status(401).json({
                msg: 'User not allowed to login'
            });
        }
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
            admin: user.admin,
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

    const user = await User.findByPk(uid, {
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'password', 'id', 'active']
        }
    });

    let admin = false;

    if (user) {
        admin = user.toJSON().admin;
    }
    // Generar Json Web Token JWT
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token,
        admin
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

const getUserById = async (req, res = response) => {

    try {
        const { id } = req.params;

        if (!id) {
            return res.status(404).json({
                msg: `Forgot to send the user id`
            });
        }

        const user = await User.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'id', 'active']
            }
        });

        if (!user) {
            return res.status(404).json({
                msg: `User with the ID ${id} not found`
            });
        }

        res.status(200).json({
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).status({
            msg: 'Error, contact with the administrator'
        });
    }

}

const addUser = async (req, res = response) => {

    const { name, email, password: passwordReq, admin } = req.body;

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
        const active = true;

        const user = await User.create({
            name,
            email,
            password,
            admin,
            active
        });

        res.status(201).json({
            user,
            ok: true,
            msg: 'User created successfully'
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
    const { name, email, password: passwordReq, active, admin } = req.body;

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

        const isMasterAdmin = User.findByPk(id);
        const { email: adminEmail } = (await isMasterAdmin).toJSON();

        if (adminEmail && adminEmail === 'superadmin@mtile.org') {
            return res.status(401).json({
                msg: 'Cannot update a master account'
            });
        }

        await User.update({
            name,
            email,
            password,
            active,
            admin
        },
            {
                where: {
                    id
                }
            });

        const user = await User.findByPk(id,
            {
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            }
        );

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

        const userDB = await User.findByPk(id);
        const { active: isActive } = userDB.toJSON();
        let active = !isActive;

        const isMasterAdmin = await User.findByPk(id);
        const { email: adminEmail } = isMasterAdmin.toJSON();

        if (adminEmail && adminEmail === 'superadmin@mtile.org') {
            return res.status(401).json({
                msg: 'The acount of master cannot be disabled'
            });
        }

        await User.update(
            {
                active
            }, { where: { id } });

        const user = await User.findByPk(id,
            {
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            }
        );

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
    getUserById,
    addUser,
    updateUser,
    deleteUser,
}