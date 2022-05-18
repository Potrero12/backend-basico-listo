const { response } = require("express");
const bcryptjs = require("bcryptjs");

const { generarJWT } = require("../middlewares/generar-jwt");

const Usuario = require('../models/usuario');

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        // verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password No son Correctos - correo'
            })
        }

        // si el usuario esta activo en la db
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password No son Correctos - usuario: false'
            })
        }

        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(404).json({
                msg: 'Usuario / Password No son Correctos - password'
            })
        }

        // generar el jwt
        const token = await generarJWT(usuario.id);

        res.status(201).send({
            usuario,
            token
        });


        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Error en la base de datos'
        });
    }

}

module.exports = {
    login
}