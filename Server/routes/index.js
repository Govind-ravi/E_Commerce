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
  getProductsByCategory,
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
  handleClearCart,
  removeFromCart,
  removeFromWishlist,
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
Router.get("/product/:id", getProductById);
Router.get("/searchproducts", searchProducts);
Router.get("/category/:name", getProductsByCategory);

// Collections
Router.get("/allcollections", allCollections);
Router.post("/createcollection", authToken, createCollection);
Router.post("/addtocollection", authToken, addToCollection);
Router.post("/deleteproductidfromcollection", authToken, deleteProductIdfFromCollection);

// cart
Router.post("/addtocart", authToken, addToCart);
Router.post("/removefromcart", authToken, removeFromCart);
Router.post("/clearcart", authToken, handleClearCart);

// wishlist
Router.post("/addtowishlist", authToken, addToWishlist);
Router.post("/removefromwishlist", authToken, removeFromWishlist);
Router.post("/getwishlist", authToken, getWishlist);

export default Router;
