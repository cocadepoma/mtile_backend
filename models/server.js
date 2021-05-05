const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const db = require('../db/connection');

const factoryRoutes = require('../routes/factory');
const eventRoutes = require('../routes/event');
const crewRoutes = require('../routes/crew');
const warehouseRoutes = require('../routes/warehouse');
const userRoutes = require('../routes/user');
const warningRoutes = require('../routes/warning');
const uploadRoutes = require('../routes/upload');
const statisticsRoutes = require('../routes/statistics');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.apiPaths = {
            auth: '/api/auth',
            events: '/api/events',
            crew: '/api/crew',
            warehouse: '/api/warehouse',
            warnings: '/api/warnings',
            factory: '/api/factory',
            users: '/api/users',
            uploads: '/api/uploads',
            statistics: '/api/statistics',
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
            throw new Error(error, 'Error al conectar DB');
        }
    }

    middlewares() {
        // CORSS
        this.app.use(cors());

        // To be able to read req.body
        this.app.use(express.json());

        // Share public folder
        this.app.use(express.static('public'));

        // File Uploader
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true // Creará el dir destino si no existe
        }));
    }

    routes() {
        //this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.factory, factoryRoutes);
        this.app.use(this.apiPaths.events, eventRoutes);
        this.app.use(this.apiPaths.crew, crewRoutes);
        this.app.use(this.apiPaths.warehouse, warehouseRoutes);
        this.app.use(this.apiPaths.users, userRoutes);
        this.app.use(this.apiPaths.warnings, warningRoutes);
        this.app.use(this.apiPaths.uploads, uploadRoutes);
        this.app.use(this.apiPaths.statistics, statisticsRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor funcionando en el puerto ' + this.port);
        });
    }


}

module.exports = Server;