import express from "express";
import authToken from "../middleware/authToken.js";
import { userSignInController, userSignOutController, userSignUpController } from "../controller/userAuth.js";
import { updateUserPasswordController, updateUserProfileController, userAddressController, userProfileController, userRemoveAddress } from "../controller/userProfile.js";
import { getProduct, searchProducts } from "../controller/product.js";
import { allCollections, uploadCollection, uploadProduct } from "../controller/adminCollections.js";
const Router = express.Router();

Router.post("/signup", userSignUpController);
Router.post("/signin", userSignInController);
Router.get("/signout", authToken, userSignOutController);
Router.get("/profile", authToken, userProfileController);
Router.post("/addaddress", authToken, userAddressController);
Router.post("/removeaddress", authToken, userRemoveAddress);
Router.put("/updateprofile", authToken, updateUserProfileController);
Router.put("/updatepassword", authToken, updateUserPasswordController);
Router.post('/uploadproduct', authToken,  uploadProduct);
Router.post('/uploadcollections', authToken, uploadCollection);
Router.get('/getproducts', getProduct);
Router.get('/searchproducts', searchProducts);
Router.get('/allcollections', allCollections);

export default Router;
