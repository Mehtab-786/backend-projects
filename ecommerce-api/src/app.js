//packages import
import { config } from 'dotenv';
config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js'

// iniatialization and middlewares
const app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes initialization
app.use('/api/user',userRoutes);

export default app;