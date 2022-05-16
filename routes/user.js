const { Router } = require("express");

const { 
    actualizarUsuario,
    borrarUsuarios, 
    crearUsuarios,
    getUsuarios, 
} = require("../controllers/user");

const router = Router();

router.get('/', getUsuarios);

router.post('/crear-usuario', crearUsuarios);

router.put('/actualizar-usuario/:id', actualizarUsuario);

router.delete('/borrar-usuario/:id', borrarUsuarios);



module.exports = router;