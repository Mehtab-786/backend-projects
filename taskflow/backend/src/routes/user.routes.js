import { Router } from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/user.controllers.js'
import { authUser } from '../middlewares/auth.middlewares.js';

const routes = Router();

routes.post('/register', registerUser);

routes.post('/login', loginUser);

routes.post('/logout', logoutUser);

routes.get("/checkuser", authUser, (req, res) => {
  return res.status(200).json({
    message: "User authenticated",
    user: req.user,
  });
});

export default routes;