const { response,request } = require("express");


const getUsuarios = (req = request, res = response) => {

    const { nombre, edad, q, page = 1, limit } = req.query;

    res.send({
        q,
        nombre, 
        edad,
        limit,
        page
    });
}

const crearUsuarios = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        nombre,
        edad
    });
}

const actualizarUsuario = (req, res = response) => {

    const id = req.params.id;

    res.status(201).json({
        id
    });

}

const borrarUsuarios = (req, res = response) => {
    res.send({
        ok: true, 
        msg: 'get api'
    });
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuarios
}