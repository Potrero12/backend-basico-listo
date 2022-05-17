// REST Server con clases
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // conectar base de datos
        this.conectarDB();

        //  Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        // conexion a la base de datos
        await dbConnection();
    }

    middlewares(){

        // cors
        this.app.use(cors());

        // parseo y lectura de body
        this.app.use(express.json());

        // directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server funcionando en el puerto:', this.port);
        });
    }

}

module.exports = Server;