const { response } = require("express");
const jwt = require("jsonwebtoken");

const validatorJWT = (req, res = response, next) => {
    // x-token headers
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "There is no token",
        });
    }

    try {
        const { uid, name } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        req.uid = uid;
        req.name = name;

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "Invalid Token",
        });
    }

    next();
};

module.exports = {
    validatorJWT,
};