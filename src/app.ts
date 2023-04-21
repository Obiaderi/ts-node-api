import 'module-alias/register';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

// custom imports
import IController from '@/utils/interfaces/controller.interface';
import errorMiddleware from '@/middleware/error.middleware';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: IController[], port: number) {
        this.express = express();
        this.port = port;
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(compression());
        this.express.use(morgan('dev'));
        this.express.use(helmet());
    }

    private initializeControllers(controllers: IController[]): void {
        controllers.forEach((controller: IController) => {
            this.express.use('/', controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

    private connectToTheDatabase(): void {
        mongoose
            .connect(
                process.env.MONGO_PATH === undefined
                    ? ''
                    : process.env.MONGO_PATH
            )
            .then(() => {
                console.log('Connected to the database');
            })
            .catch((error) => {
                console.log('Error connecting to the database: ', error);
            });
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
