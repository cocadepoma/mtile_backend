const { Router } = require('express');
const { check } = require('express-validator');
const { uploadImageTechnician, uploadDoc, deleteDoc } = require('../controllers/upload.controller');

const { checkFields } = require('../middlewares/check_fields');
const { validateUploadingFile } = require('../middlewares/file_validator');
const { validatorJWT } = require('../middlewares/jwt_validator');


const router = Router();


router.post('/doc', [
    validatorJWT,
    check('section', 'The section ID must be provided').not().isEmpty(),
    check('info', 'The info of the file must be provided').not().isEmpty(),
    validateUploadingFile,
    checkFields
], uploadDoc);

router.delete('/doc/:id', [
    validatorJWT,
    checkFields
], deleteDoc);

router.post('/technician', [
    validatorJWT,
    validateUploadingFile,
    checkFields
], uploadImageTechnician);


module.exports = router;
