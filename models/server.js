// REST Server con clases
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/busqueda',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads'
        }

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

        // fileupload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.usuarios, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server funcionando en el puerto:', this.port);
        });
    }

}

module.exports = Server;