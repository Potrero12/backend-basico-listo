const Role = require('../models/rol');
const { Usuario, Categoria, Producto } = require('../models');

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol) {
        throw new Error(`EL rol ${rol} no esta registrado en la base de datos`)
    }
}

const emailExiste = async(correo = '') => {
    // verificar si ya existe el correo
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error(`EL email ${correo} ya esta registrado`)
    }
}

const existeUsuarioPorId = async(id) => {
    // verificar si ya existe el correo
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error(`EL id no existe ${id}`)
    }
}

const existeCategoriaPorId = async(id) => {
    // verificar si ya existe el correo
    const existeCategoria = await Categoria.findById(id)
    if(!existeCategoria){
        throw new Error(`EL id no existe ${id}`)
    }
}

const existeProductoPorId = async(id) => {
    // verificar si ya existe el correo
    const existeProducto = await Producto.findById(id)
    if(!existeProducto){
        throw new Error(`EL id no existe ${id}`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}
