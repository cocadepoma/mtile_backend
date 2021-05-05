const { response } = require("express");
const { uploadFile } = require("../helpers/upload_file");
const { Doc } = require("../models/factory.models")



const uploadDoc = async (req, res = response) => {

    const { section: sectionId, info } = req.body;

    try {

        // Move the file from temp to final folder, change the name of the file with an uuid
        const name = await uploadFile(req.files, ['application/pdf'], 'docs');

        // Save the file
        await Doc.create({
            name,
            info,
            sectionId,
        });

        // Get the info from DB of the uploaded file and send to the FRONTEND
        const uploadedDoc = await Doc.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                name
            }
        })

        res.status(201).json({
            uploadedDoc
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: error
        });
    }
}

const deleteDoc = async (req, res = response) => {

    const { id } = req.params;

    if (id) {

        try {
            const dbDoc = await Doc.findByPk(id);

            if (!dbDoc) {
                return res.status(404).json({
                    msg: 'The id provided does not exist'
                });
            }

            await dbDoc.destroy();

            res.json({
                msg: 'volado',
                dbDoc
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Error, contact with the administrator'
            });
        }

    } else {
        return res.status(404).json({
            msg: 'The Doc ID must be provided'
        });
    }
}


const uploadImageTechnician = async (req, res = response) => {

    const name = await uploadFile(req.files, undefined, 'images');

    res.status(201).json({
        name
    });
}

module.exports = {
    uploadDoc,
    deleteDoc,
    uploadImageTechnician
}