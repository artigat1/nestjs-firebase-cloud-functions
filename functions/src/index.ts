import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ApplicationModule } from './modules/app.module';

const server: express.Express = express();

const startNestApplication = async (expressInstance: express.Express) => {
    const app = await NestFactory.create(ApplicationModule, expressInstance);

    app.use(bodyParser.json());

    const options = new DocumentBuilder()
        .setTitle('NestJS Firebase Cloud Functions')
        .setDescription('Project to investigate using NestJS/Node to write Firebase Cloud function for a API')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.init();
};

startNestApplication(server);

export const api = functions.https.onRequest(server);