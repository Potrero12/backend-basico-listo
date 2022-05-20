const { Router } = require("express");
const { check } = require('express-validator');

const { 
    crearCategoria, 
    obtenerCategorias, 
    obtenerCategoriaPorId,
    actualizarCategoria,
    borrarCatetoria
} = require("../controllers/categorias");

const { existeCategoriaPorId } = require("../helpers/db-validators");
const { validarCampos, validarToken, esAdminRol, tieneRol } = require("../middlewares");

const router = Router();

// todas las categorias - publico
router.get('/obtener-categorias', obtenerCategorias)

// obtener un categoria por id - publico
router.get('/obtener-categoria/:id', 
    [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos
    ], obtenerCategoriaPorId)

// crear categoria - privado, cualquier rol
router.post('/crear-categoria', 
    [
        validarToken,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], crearCategoria)

// actualizar categoria - privado, cualquier rol
router.put('/actualizar-categoria/:id', 
    [
        validarToken,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos
    ], actualizarCategoria)

// eliminar categoria - privado - admin
router.delete('/borrar-categoria/:id', 
    [
        validarToken,
        esAdminRol,
        tieneRol('ADMIN_ROLE'),
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos
    ], borrarCatetoria)

module.exports = router;