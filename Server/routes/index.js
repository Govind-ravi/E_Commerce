import express from "express";
import authToken from "../middleware/authToken.js";
import {
  userSignInController,
  userSignOutController,
  userSignUpController,
} from "../controller/userAuth.js";
import {
  updateUserPasswordController,
  updateUserProfileController,
  userAddressController,
  userProfileController,
  userRemoveAddress,
} from "../controller/userProfile.js";
import {
  getProductById,
  getProducts,
  searchProducts,
} from "../controller/product.js";
import {
  addToCollection,
  allCollections,
  createCollection,
  deleteProductIdfFromCollection,
  uploadProduct,
} from "../controller/adminCollections.js";
import {
  addToCart,
  addToWishlist,
  getWishlist,
  removeFromCart,
  removeFromWishlist,
  updateQuantityInCart,
} from "../controller/userCartWishlist.js";
const Router = express.Router();

Router.post("/signup", userSignUpController);
Router.post("/signin", userSignInController);
Router.get("/signout", authToken, userSignOutController);
Router.get("/profile", authToken, userProfileController);
Router.post("/addaddress", authToken, userAddressController);
Router.post("/removeaddress", authToken, userRemoveAddress);
Router.put("/updateprofile", authToken, updateUserProfileController);
Router.put("/updatepassword", authToken, updateUserPasswordController);

// Products
Router.get("/getproducts", getProducts);
Router.post("/uploadproduct", authToken, uploadProduct);
Router.get("/allcollections", authToken, allCollections);
Router.post("/createcollection", authToken, createCollection);
Router.post("/addtocollection", authToken, addToCollection);
Router.post("/deleteproductidfromcollection", authToken, deleteProductIdfFromCollection);
Router.get("/product/:id", getProductById);
Router.get("/searchproducts", searchProducts);
Router.get("/addtocart", authToken, addToCart);
Router.get("/removefromcart", authToken, removeFromCart);
Router.get("/updatequantityincart", authToken, updateQuantityInCart);
Router.get("/addtowishlist", authToken, addToWishlist);
Router.get("/removefromwishlist", authToken, removeFromWishlist);
Router.get("/getwishlist", authToken, getWishlist);

export default Router;
