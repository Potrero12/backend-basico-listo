const { Router } = require("express");
const { check } = require('express-validator');

const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require("../controllers/uploads");
const { coleccionesPermitidas, existeUsuarioPorId, existeProductoPorId } = require("../helpers/db-validators");
const { validarCampos, validarArchivo } = require("../middlewares");

const router = Router();

router.post('/cargar-archivo', validarArchivo, cargarArchivo);

router.put('/:coleccion/:id', 
    [   
        validarArchivo,
        check('id', 'El id debe ser de mongo').isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
        // check('id').custom(existeUsuarioPorId),
        // check('id').custom(existeProductoPorId),
        validarCampos
    ], actualizarImagenCloudinary);
    // ], actualizarImagen); / subir imagenes localmente
        
router.get('/:coleccion/:id', 
    [
        check('id', 'El id debe ser de mongo').isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
        validarCampos
    ], mostrarImagen);

module.exports = router;