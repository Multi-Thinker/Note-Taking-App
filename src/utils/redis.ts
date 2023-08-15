import Logger from './Logger';

const redis = require('redis');
const client = redis.createClient();
const logger = Logger.getInstance();
client.on('reconnecting', () => {
  logger.log('Redis client is reconnecting');
});

client.on('connect', () => {
  logger.log('Redis Connecting...');
});

client.on('error', (error) => {
  logger.error('Error connecting to Redis:', error);
});
client.on('end', () => {
  logger.log('Redis client connection has ended');
});

export const clearRedisCache = async () => {
  await client.flushAll();
};

export default client;
