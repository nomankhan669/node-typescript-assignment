import cors from 'cors';
import express from 'express';
import { NODE_ENV, ORIGIN, PORT } from '@config';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(routes: Routes[]) {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 3000;

        this.initMiddleWares();
        this.initRoutes(routes);
        this.initErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`=================================`);
            console.log(`Environment: ${this.env}`);
            console.log(`App listening on: http://localhost:${this.port}`);
            console.log(`=================================`);
        })
    }

    public getServer() {
        return this.app;
    }

    public initMiddleWares() {
        this.app.use(cors({ origin: ORIGIN, credentials: true }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    public initRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    public initErrorHandling() {
        this.app.use(errorMiddleware);
    }
}

export default App;