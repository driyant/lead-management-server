import cors from 'cors';
import express, { Application } from 'express';
import router from './routes/index';

const app: Application = express();

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Mount router
app.use('/', router);

export default app;