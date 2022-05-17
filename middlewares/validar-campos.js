const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({
            errores: result.mapped()
        });
    };

    next();

}

module.exports = {
    validarCampos
}