const { response, request } = require("express");
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarToken = async(req = request, res = response ,next) => {

    // validamos que el token exista
    const token = req.header('x-token');
    if(!token){
        res.status(403).json({
            msg: 'No hay token en la cabecera de peticion'
        })
    }
    
    try {
        
        // verificamos que el token sea correcto
        const { uid } = jwt.verify(token, process.env.SECRET_WORD);

        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en la db'
            })
        }

        // verificar si el uid no esta eliminado
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario en false'
            })
        }

        //asignamos al uid de la quest el uid del token para verificacion
        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Token no valido'
        });
    }

}

module.exports = {
    validarToken
}