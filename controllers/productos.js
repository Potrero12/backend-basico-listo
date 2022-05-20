const { request, response } = require("express");
const { Producto } = require("../models")

const obtenerProductos = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = Number(req.query);
    const query = {estado: true}

    try {

        const [productos, total] = await Promise.all([
            Producto.find(query)
                        .populate('usuario', 'nombre')
                        .populate('categoria', 'nombre')
                        .skip(desde)
                        .limit(limite),

                        Producto.countDocuments(query)
        ]);

        res.status(200).json({
            productos,
            total
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Error en la base de datos'
        });
    }

}

const obtenerProductoPorId = async(req = request, res = response) => {
    try {

        const id = req.params.id;

        const producto = await Producto.findById(id)
                                        .populate('usuario', 'nombre')
                                        .populate('categoria', 'nombre');

        res.status(200).json({
            producto,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Error en la base de datos'
        });
    }

}

const crearProducto = async(req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    try {

        const productoDB = await Producto.findOne({nombre});
        if(productoDB){
            return res.status(400).json({
                msg: `La categoria ${productoDB.nombre}, ya existe`
            })
        }

        // generar la data al guardar
        const data = {
            nombre,
            categoria: req.body.categoria,
            usuario: req.usuario._id
        }

        const producto = new Producto(data);
        await producto.save();

        res.status(201).json({
            producto,
            msg: 'Categoria Creada Correctamente'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Token no valido'
        });
    }


}

const actualizarProducto = async(req = request, res = response) => {

    const id = req.params.id
    const nombre = req.body.nombre.toUpperCase();

    try {

        const data = {
            usuario: req.usuario._id,
            categoria: req.body.categoria,
            nombre
        }

        const nuevoProducto = await Producto.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            nuevoProducto,
            msg: 'Producto Actualizado Correctamente'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Token no valido'
        });
    }

}

const borrarProducto = async(req = request, res = response) => {

    const id = req.params.id;
    // const uid = req.uid;

    try {

        // cambiando el estado del usuario - la forma correcta del uso
        const producto = await Producto.findByIdAndUpdate(id, {estado: false});

        res.status(200).json({
            producto
        });

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Error en la base de datos'
        });
    };

}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    borrarProducto
}