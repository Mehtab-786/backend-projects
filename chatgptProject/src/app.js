import {config} from 'dotenv';
config();
import cookieParser from 'cookie-parser'
import express from 'express';
import userRouter from './routes/UserRoutes.routes.js'
import chatRouter from './routes/chatRoutes.routes.js'

const app = express()

app.use(cookieParser());
app.use(express.json());


app.use('/api/user',userRouter);
app.use('/api/chat',chatRouter);

export default app;