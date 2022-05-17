const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.DB_CONNECTION);

        console.log('Base de datos corriendo corrrectamente');
        
    } catch (error) {
        console.log(error)
        throw new Error('Error en la conexion de la base de datos');
    }

}

module.exports = {
    dbConnection
};