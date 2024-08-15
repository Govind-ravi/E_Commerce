import express from "express";
import authToken from "../middleware/authToken.js";
import { userSignInController, userSignOutController, userSignUpController } from "../controller/userAuth.js";
import { updateUserPasswordController, updateUserProfileController, userAddressController, userProfileController, userRemoveAddress } from "../controller/userProfile.js";
import { getProduct, searchProducts, uploadProduct } from "../controller/product.js";
const Router = express.Router();

Router.post("/signup", userSignUpController);
Router.post("/signin", userSignInController);
Router.get("/signout", authToken, userSignOutController);
Router.get("/profile", authToken, userProfileController);
Router.post("/addaddress", authToken, userAddressController);
Router.post("/removeaddress", authToken, userRemoveAddress);
Router.put("/updateprofile", authToken, updateUserProfileController);
Router.put("/updatepassword", authToken, updateUserPasswordController);
Router.post('/uploadproduct', uploadProduct);
Router.get('/getproducts', getProduct);
Router.get('/searchproducts', searchProducts);

export default Router;
