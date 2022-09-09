import express from 'express';
import cron from 'node-cron';

import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';

import runJobs from '../../../modules/urls/jobs/cronManager';
import createConnection from '../database';
import { errorHandler } from './middlewares/errors/ErrorHandler.middleware';
import { routes } from './routes';
import '../../container';

createConnection();
const app = express();
app.use(express.json());

app.use('/', routes);
app.use(errorHandler);

cron.schedule('0 3 */7 * *', async () => runJobs());
export { app };
