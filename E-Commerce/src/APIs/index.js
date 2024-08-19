const domain = "http://localhost:3000/api";

const APIs = {
  SignUp: {
    url: `${domain}/signup`,
  },
  SignIn: {
    url: `${domain}/signin`,
  },
  Profile: {
    url: `${domain}/profile`,
  },
  signOut: {
    url: `${domain}/signout`,
  },
  addAddress: {
    url: `${domain}/addaddress`,
  },
  removeAddress: {
    url: `${domain}/removeaddress`,
  },
  updateProfile: {
    url: `${domain}/updateprofile`,
  },
  updatePassword: {
    url: `${domain}/updatepassword`,
  },
  searchProducts: {
    url: `${domain}/searchproducts`,
  },
  getProducts: {
    url: `${domain}/getproducts`,
  },
  uploadProduct: {
    url: `${domain}/uploadproduct`,
  },
  fetchProductById: {
    url: `${domain}/product`,
  },
  fetchAdminCollections: {
    url: `${domain}/allcollections`,
  },
  createAdminCollections: {
    url: `${domain}/createcollection`,
  },
  addProductToCollection: {
    url: `${domain}/addtocollection`,
  },
  deletProductIdFromCollection: {
    url: `${domain}/deleteproductidfromcollection`,
  },
  addToCart: {
    url: `${domain}/addtocart`,
  },
  removeFromCart: {
    url: `${domain}/removefromcart`,
  },
  clearCart: {
    url: `${domain}/clearcart`,
  },
  addToWishlist: {
    url: `${domain}/addtowishlist`,
  },
  removeFromWishlist: {
    url: `${domain}/removefromwishlist`,
  },
};

export default APIs;
