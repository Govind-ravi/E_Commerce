import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

async function userSignUpController(req, res) {
  try {
    const { name, email, password, profilePicture, role } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ error: true, message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      profilePicture,
      role
    });
    await newUser.save();
    const tokenData = {
      _id: newUser._id,
      email: newUser.email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 8,
    });

    const tokenOption = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("token", token, tokenOption);
    res
      .status(201)
      .json({
        data: newUser,
        error: false,
        message: "User signed up successfully",
        success: true,
      });
  } catch (err) {
    res.json({ error: true, message: err, success: false });
  }
}

export default userSignUpController;
