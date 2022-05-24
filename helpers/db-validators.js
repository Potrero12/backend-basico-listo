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
        throw new Error(`EL id no existe ${id} usuario`)
    }
}

const existeCategoriaPorId = async(id) => {
    // verificar si ya existe el correo
    const existeCategoria = await Categoria.findById(id)
    if(!existeCategoria){
        throw new Error(`EL id no existe ${id} categoria`)
    }
}

const existeProductoPorId = async(id) => {
    // verificar si ya existe el correo
    const existeProducto = await Producto.findById(id)
    if(!existeProducto){
        throw new Error(`EL id no existe ${id} producto`)
    }
}

// validar colecciones permitidas
const coleccionesPermitidas = async(coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if(!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`)
    }

    return true;

}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}
