import { Router } from 'express';
import { allTask, deleteTask, taskCreate, updateCompleted, updateTask } from '../controllers/task.controllers.js';

const routes = Router();

routes.post('/', taskCreate);

routes.get('/tasks', allTask)

routes.delete('/delete/:id', deleteTask);

routes.patch('/update/:id', updateTask)

routes.patch('/completed/:id', updateCompleted)

export default routes;