import { Router } from 'express';
import { allTask, deleteTask, taskCreate, updateTask } from '../controllers/task.controllers.js';

const routes = Router();

routes.post('/', taskCreate);

routes.get('/tasks', allTask)

routes.delete('/delete/:id', deleteTask);

routes.patch('/update/:id', updateTask)

export default routes;