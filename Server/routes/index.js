import express from 'express';
import userSignUpController from '../controller/userSignUp.js';
import userSignInController from '../controller/userSignIn.js';
const Router = express.Router();

Router.post('/signup', userSignUpController)
Router.post('/signin', userSignInController)

export default Router;