import express from "express";
import userSignUpController from "../controller/userSignUp.js";
import userSignInController from "../controller/userSignIn.js";
import userProfileController from "../controller/userProfile.js";
import authToken from "../middleware/authToken.js";
import userSignOutController from "../controller/userSignOut.js";
import userAddressController, { userRemoveAddress } from "../controller/userAddress.js";
import { updateUserPasswordController, updateUserProfileController } from "../controller/updateProfile.js";
const Router = express.Router();

Router.post("/signup", userSignUpController);
Router.post("/signin", userSignInController);
Router.get("/profile", authToken, userProfileController);
Router.get("/signout", authToken, userSignOutController);
Router.post("/addaddress", authToken, userAddressController);
Router.post("/removeaddress", authToken, userRemoveAddress);
Router.put("/updateprofile", authToken, updateUserProfileController);
Router.put("/updatepassword", authToken, updateUserPasswordController);

export default Router;
