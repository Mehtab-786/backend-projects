import {config} from 'dotenv';
config();
import express from 'express';
import userRouter from './routes/UserRoutes.routes.js'

const app = express()
app.use(express.json())


app.use('/api/user',userRouter)

export default app