const { response,request } = require("express");
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario');

const getUsuarios = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = Number(req.query);
    const query = {estado: true}

    try {

        const [usuarios, total] = await Promise.all([
            Usuario.find(query)
                        .skip(desde)
                        .limit(limite),

            Usuario.countDocuments(query)
        ]);

        res.status(200).json({
            usuarios,
            total
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Error en la base de datos'
        });
    }


}

const crearUsuarios = async(req, res = response) => {

    const { correo, password } = req.body;
    
    try {

        const usuario = new Usuario(req.body);

        // verificar si ya existe el correo
        const existeEmail = await Usuario.findOne({correo})
        if(existeEmail){
            return res.status(401).json({
                msg: 'Ya existe registrado el correo'
            })
        }

        // encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // guardar DB
        await usuario.save();

        res.status(201).json({
            usuario
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Error en la base de datos'
        });
    };
};

const actualizarUsuario = async(req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...campos } = req.body;

    try {

        // validar contra base de datos - si viene la password es porque la quiere actualizar
        if(password) {
            const salt = bcrypt.genSaltSync();
            campos.password = bcrypt.hashSync(password, salt);
        }

        const usuarioDB = await Usuario.findByIdAndUpdate(id, campos, {new: true});

        res.status(201).json({
            usuarioDB,
            msg: 'Usuario actualizado correctamente'
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Error en la base de datos'
        });
    };


}

const borrarUsuarios = async(req, res = response) => {

    const id = req.params.id;

    try {

        // // borrarlo fisicamente de la db
        // const usuario = await Usuario.findByIdAndDelete(id);
        // res.status(200).json({
        //     usuario
        // });

        // cambiando el estado del usuario - la forma correcta del uso
        const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

        res.status(200).json({
            usuario
        });

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Error en la base de datos'
        });
    };

}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuarios
}