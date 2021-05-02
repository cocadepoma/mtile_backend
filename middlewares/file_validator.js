const { response } = require("express")

const validateUploadingFile = (req, res = response, next) => {

    console.log(req.body, req.files)

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({ msg: 'The are not uploaded files' });
    }

    next();
}

module.exports = {
    validateUploadingFile
}