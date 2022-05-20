const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String
    },
    disponble: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    }

})

ProductoSchema.method('toJSON', function(){

    const { __v, estado, ...data } = this.toObject();
    return data;

})

module.exports = model('Producto', ProductoSchema)