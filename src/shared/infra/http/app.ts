import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cron from 'node-cron';

import 'reflect-metadata';
import runJobs from '../../../modules/urls/jobs/cronManager';
import '../../container';
import createConnection from '../database';
import { errorHandler } from './middlewares/errors/ErrorHandler.middleware';
import { routes } from './routes';

createConnection();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/', routes);
app.use(errorHandler);

cron.schedule('0 3 */7 * *', async () => runJobs());
export { app };
