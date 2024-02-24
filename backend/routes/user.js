import express from 'express';
import { logInUser, signUpUser } from '../controllers/userController.js';

const userRouter = express.Router();

//LOGIN ROUTE
userRouter.post('/login', logInUser);

//SIGNUP ROUTE
userRouter.post('/signup', signUpUser);

export default userRouter;