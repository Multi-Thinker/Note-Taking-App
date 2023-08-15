import dotenv from 'dotenv';
import path from 'path';
import { clearRedisCache } from '../src/utils/redis';
dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

beforeAll(async () => {
  await clearRedisCache();
});

afterAll(async () => {
  // any script here
});
