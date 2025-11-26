import { Router } from 'express';
import { allTask, deleteTask, taskCreate, updateCompleted, updateTask } from '../controllers/task.controllers.js';
import {authUser} from '../middlewares/auth.middlewares.js';

const routes = Router();

routes.post('/', authUser,   taskCreate);

routes.get('/tasks', authUser,  allTask)

routes.delete('/delete/:id', authUser,  deleteTask);

routes.patch('/update/:id', authUser,  updateTask)

routes.patch('/completed/:id', authUser,  updateCompleted)

export default routes;