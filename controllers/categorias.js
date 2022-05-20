const { request, response } = require("express");
const { Categoria } = require("../models")

const obtenerCategorias = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = Number(req.query);
    const query = {estado: true}

    try {

        const [categorias, total] = await Promise.all([
            Categoria.find(query)
                        .populate('usuario', 'nombre')
                        .skip(desde)
                        .limit(limite),

            Categoria.countDocuments(query)
        ]);

        res.status(200).json({
            categorias,
            total
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Error en la base de datos'
        });
    }

}

const obtenerCategoriaPorId = async(req = request, res = response) => {

    try {

        const id = req.params.id;

        const categoria = await Categoria.findById(id)
                                        .populate('usuario', 'nombre');

        res.status(200).json({
            categoria,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Error en la base de datos'
        });
    }

}

const crearCategoria = async(req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    try {

        const categoriaDB = await Categoria.findOne({nombre});
        if(categoriaDB){
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre}, ya existe`
            })
        }

        // generar la data al guardar
        const data = {
            nombre,
            usuario: req.usuario._id
        }

        const categoria = new Categoria(data);
        await categoria.save();

        res.status(201).json({
            categoria,
            msg: 'Categoria Creada Correctamente'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Token no valido'
        });
    }


}

const actualizarCategoria = async(req = request, res = response) => {

    const id = req.params.id
    const nombre = req.body.nombre.toUpperCase();

    try {

        const data = {
            usuario: req.usuario._id,
            nombre
        }

        const nuevaCategoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            nuevaCategoria,
            msg: 'Categoria Actualizada Correctamente'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Token no valido'
        });
    }

}

const borrarCatetoria = async(req = request, res = response) => {

    const id = req.params.id;
    // const uid = req.uid;

    try {

        // cambiando el estado del usuario - la forma correcta del uso
        const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});

        res.status(200).json({
            categoria
        });

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Error en la base de datos'
        });
    };

}

module.exports = {
    obtenerCategorias,
    crearCategoria,
    obtenerCategoriaPorId,
    actualizarCategoria,
    borrarCatetoria
}