import * as functions from 'firebase-functions';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from './modules/app.module';

const server: express.Express = express();

const startNestApplication = async (expressInstance: express.Express) => {
    const app = await NestFactory.create(ApplicationModule, expressInstance);
    await app.init();
};

startNestApplication(server);

export const api = functions.https.onRequest(server);