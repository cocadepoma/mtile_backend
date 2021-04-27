const express = require('express');
const cors = require('cors');
const db = require('../db/connection');
const factoryRoutes = require('../routes/factory');
const eventRoutes = require('../routes/event');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.apiPaths = {
            auth: '/api/auth',
            events: '/api/events',
            technicians: '/api/technicians',
            warehouse: '/api/warehouse',
            warnings: '/api/warnings',
            factory: '/api/factory',
        }

        // Initial Methods
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database Initialized');
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {
        // CORSS
        this.app.use(cors());

        // To be able to read req.body
        this.app.use(express.json());

        // Share public folder
        this.app.use(express.static('public'));
    }

    routes() {
        //this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.factory, factoryRoutes);
        this.app.use(this.apiPaths.events, eventRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor funcionando en el puerto ' + this.port);
        });
    }


}

module.exports = Server;