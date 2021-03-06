const { Router } = require("express");
const { check } = require('express-validator');

const { 
    actualizarUsuario,
    borrarUsuarios, 
    crearUsuarios,
    getUsuarios, 
} = require("../controllers/user");

const { esRolValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const {
    validarCampos,
    validarToken,
    esAdminRol,
    tieneRol
} = require('../middlewares');

const router = Router();

router.get('/', getUsuarios);

router.post('/crear-usuario',
    [
        validarToken,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligarotio y debe ser válido').isEmail(),
        check('correo').custom(emailExiste),
        check('password', 'La contraseña es obligatoria').not().isEmpty().isLength({min: 6}),
        // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom(esRolValido),
        validarCampos
    ], crearUsuarios);

router.put('/actualizar-usuario/:id', 
    [
        validarToken,
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRolValido),
        validarCampos
    ], actualizarUsuario);

router.delete('/borrar-usuario/:id',
    [   
        validarToken,
        esAdminRol,
        tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
    ], borrarUsuarios);

module.exports = router;