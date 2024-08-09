import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";

async function userSignUpController(req, res) {
  try {
    const { name, email, password, profilePicture } = req.body;

    const user = await userModel.findOne({email})

    if(user){
      return res.status(400).json({ error: true, message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword, profilePicture});    
    await newUser.save();
    res.status(201).json({ data: newUser, error: false, message: "User signed up successfully", success: true });
  } catch (err) {
    res.json({ error: true, message: err, success: false });
  }
}

export default userSignUpController;