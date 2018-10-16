import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ApplicationModule } from './modules/app.module';

const server: express.Express = express();
/* Express middleware. */
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());
/* End of express middleware. */

const startNestApplication = async (expressInstance: express.Express) => {

    const app = await NestFactory.create(ApplicationModule, expressInstance);

    app.use(bodyParser.json());

    const options = new DocumentBuilder()
        .setTitle('NestJS Firebase Cloud Functions')
        .setDescription('Project to investigate using NestJS/Node to write Firebase Cloud function for a API')
        .setVersion('1.0.0')
        .setSchemes('https')
        .setBasePath('/')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/docs', app, document);

    await app.init();
};

startNestApplication(server);

export const api = functions.https.onRequest(server);