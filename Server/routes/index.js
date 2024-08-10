import express from 'express';
import userSignUpController from '../controller/userSignUp.js';
import userSignInController from '../controller/userSignIn.js';
import userProfileController from '../controller/userProfile.js';
import authToken from '../middleware/authToken.js';
const Router = express.Router();

Router.post('/signup', userSignUpController)
Router.post('/signin', userSignInController)
Router.get('/profile', authToken, userProfileController)

export default Router;