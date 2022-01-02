const express = require('express');
const cors = require('cors');

const { json } = require('express/lib/response');
const { socketController } = require('../controllers/socket.controllers');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // para el servicio de socket io montado en http 
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {
            users     : '/api/users',
        }
        // db connection
        //this.connectDB();
        // middlewares
        this.middlewares();
        // routes
        this.routes();
        // Sockets
        this.sockets();
        // everything else fails
        this.forbidden();
    }
    
    middlewares() {
        // CORS
        this.app.use(cors());
        // parsing y reading body
        this.app.use(express.json());
        // publica la carpeta publica
        this.app.use(express.static('public'));
    }

    routes() {
        // la nueva ruta de usuarios
    }

    sockets() {
        // manejador de conexiones io
        this.io.on('connection', socketController);
    }

    forbidden() {
        this.app.use((request, response ) => {
            response.statusCode = 404;
            response.send('404!');
        });
    }

    listen() {
        // ahora solo escuchamos las llamadas al servicio io no web
        // this.app.listen(this.port, () => {
        this.server.listen(this.port, () => {
            console.log(`Escuchando puerto ${this.port}`);
        });
    }
};

module.exports = Server;