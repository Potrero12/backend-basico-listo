const { Router } = require("express");
const { check } = require('express-validator');

const { 
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    borrarProducto
} = require("../controllers/productos");

const { existeCategoriaPorId, existeProductoPorId } = require("../helpers/db-validators");
const { validarCampos, validarToken, esAdminRol, tieneRol } = require("../middlewares");

const router = Router();

// todas las categorias - publico
router.get('/obtener-productos', obtenerProductos);

// obtener un categoria por id - publico
router.get('/obtener-producto/:id', 
    [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarCampos
    ], obtenerProductoPorId)

// crear categoria - privado, cualquier rol
router.post('/crear-producto', 
    [
        validarToken,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('categoria', 'El nombre es obligatorio').not().isEmpty(),
        check('categoria', 'El nombre es obligatorio').isMongoId(),
        check('categoria').custom(existeCategoriaPorId),
        validarCampos
    ], crearProducto)

// actualizar categoria - privado, cualquier rol
router.put('/actualizar-producto/:id', 
    [
        validarToken,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarCampos
    ], actualizarProducto)

// eliminar categoria - privado - admin
router.delete('/borrar-producto/:id', 
    [
        validarToken,
        esAdminRol,
        tieneRol('ADMIN_ROLE'),
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarCampos
    ], borrarProducto)

module.exports = router;