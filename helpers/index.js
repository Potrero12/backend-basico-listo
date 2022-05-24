
const dbValidator = require('./db-validators');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...dbValidator,
    ...googleVerify,
    ...subirArchivo 
}