const domain = "http://localhost:3000/api";

const APIs = {  
    SignUp: {
        url: `${domain}/signup`
    },
    SignIn: {
        url: `${domain}/signin`
    },
    Profile: {
        url: `${domain}/profile`
    },
    signOut: {
        url: `${domain}/signout`
    }
}

export default APIs;