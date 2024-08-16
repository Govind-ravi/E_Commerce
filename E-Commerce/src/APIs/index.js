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
  uploadProduct: {
    url: `${domain}/uploadproduct`,
  },
};

export default APIs;
