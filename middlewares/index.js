const validarArchivo = require('../middlewares/validar-archivo');
const validarCampos  = require("../middlewares/validar-campos");
const validaRoles = require("../middlewares/validar-roles");
const validarToken  = require("../middlewares/validar-token");

module.exports = {
    ...validarArchivo,
    ...validarCampos,
    ...validaRoles,
    ...validarToken,
}