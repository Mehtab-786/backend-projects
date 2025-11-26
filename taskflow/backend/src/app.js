import { config } from 'dotenv';
config();
import cors from 'cors'
import express from 'express';
import taskRoutes from './routes/task.routes.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cookieParser())
app.use(express.json());

app.use('/api/task', taskRoutes);
app.use('/api/user', userRoutes);

export default app;