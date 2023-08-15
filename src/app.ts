require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './router/routes';
import redisClient, { clearRedisCache } from './utils/redis';
import Logger from './utils/Logger';
const logger = Logger.getInstance();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

redisClient.connect().then((e) => logger.log('Redis connected'));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Note Taking App API',
      version: '1.0.0',
    },
  },
  apis: ['./src/router/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const PORT = process.env.NODE_ENV == 'test' ? 3001 : process.env.PORT;

if (process.env.NODE_ENV === 'prod') {
  clearRedisCache().then((e) => logger.log('cleared redis cache'));
  app.listen(PORT, () => {
    logger.log(`Server is running on port ${PORT}`);
  });
}

export default app;
