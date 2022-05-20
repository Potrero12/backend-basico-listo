const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models')

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios',
];

const buscarUsuario = async(termino = '', res = response) => {

    esMongoID = ObjectId.isValid(termino);

    if(esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regExp = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{nombre: regExp}, {correo: regExp}],
        $and: [{estado: true}]
    });

    res.json({
        results: usuarios
    })
}

const buscarCategorias = async(termino = '', res = response) => {

    esMongoID = ObjectId.isValid(termino);

    if(esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regExp = new RegExp(termino, 'i');
    const categorias = await Categoria.find({nombre: regExp, estado: true});

    res.json({
        results: categorias
    })
}

const buscarProductos = async(termino = '', res = response) => {

    esMongoID = ObjectId.isValid(termino);

    if(esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regExp = new RegExp(termino, 'i');
    const productos = await Producto.find({nombre: regExp, estado: true}).populate('categoria', 'nombre');

    res.json({
        results: productos
    })
}

const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res)
        break;
        case 'productos':
            buscarProductos(termino, res)
        break;
        case 'usuarios':
            buscarUsuario(termino, res)
        break;
        default:
            res.status(500).json({
                msg: 'se me olvido hacer esta busqueda'
            });
    }

}

module.exports = {
    buscar
}