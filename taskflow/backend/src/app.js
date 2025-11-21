import { config } from 'dotenv';
config();
import cors from 'cors'
import express from 'express';
import taskRoutes from './routes/task.routes.js'


const app = express();

app.use(cors({ origin: '*' }))

app.use(express.json());

app.use('/api/task', taskRoutes)

export default app;