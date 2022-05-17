const Role = require('../models/rol');
const Usuario = require('../models/usuario');

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

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}
