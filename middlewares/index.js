const validarCampos  = require("../middlewares/validar-campos");
const validarToken  = require("../middlewares/validar-token");
const validaRoles = require("../middlewares/validar-roles");

module.exports = {
    ...validarCampos,
    ...validarToken,
    ...validaRoles,
}