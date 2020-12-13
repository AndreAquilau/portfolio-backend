import 'dotenv/config';
import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import { resolve } from 'path';
import routes from '@routes/index';

class App {
    app: Application;

    constructor() {
        this.app = express();
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(json());
        this.app.use(
            `/${process.env.FILES_STATICS}`,
            express.static(resolve(__dirname, '..', '..', process.env.FILES_STATICS)),
        );
        this.app.use(routes);
    }
}

export default new App().app;
