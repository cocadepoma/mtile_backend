
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const defaultExtensions = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];

const uploadFile = (files, validExtensions = defaultExtensions, folder = '') => {

    return new Promise((resolve, reject) => {
        const { file } = files;

        // Cortar extensión
        const nameWithoutExtension = file.name.split('.');
        const extension = nameWithoutExtension[nameWithoutExtension.length - 1];

        // Validate extension
        if (!validExtensions.includes(file.mimetype)) {
            return reject(`The file extension ${file.mimetype} is not allowed, Extensions allowed: ${validExtensions}`);
        }

        // Concatenate Unique ID + extensions
        const tempName = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../public/assets/', folder, tempName);

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(tempName);
        });

    });
}

module.exports = { uploadFile };