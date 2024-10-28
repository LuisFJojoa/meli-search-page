import dotenv from 'dotenv';
import { envToNumber, getEnv } from './dto.js';

dotenv.config();

export const NODE_PORT: number = envToNumber(process.env.PORT) || 3000;

export const NODE_ENV: string = getEnv(process.env.NODE_ENV) || '';

export const BASE_URL: string = getEnv(process.env.BASE_URL) || '';