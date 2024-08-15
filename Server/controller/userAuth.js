import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export async function userSignUpController(req, res) {
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

export async function userSignInController(req, res) {
  async function comparePassword(password1, password2) {
    const valid = await bcrypt.compare(password1, password2);
    return valid;
  }
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", error: true, success: false });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ message: "Wrong Password!", error: true, success: false });
    }

    const tokenData = {
      _id: user._id,
      email: user.email      
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: 60*60*8 });

    const tokenOption = {
      httpOnly: true,
      secure: true
    }
    

    res.cookie("token", token, tokenOption).status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User Signed in successfully",
    });
  } catch (error) {
    res.json({ message: error.message || error, error: true, success: false });
  }
}

export async function userSignOutController(req, res) {
  try {
    res
    .clearCookie("token")
    .status(200)
    .json({
      error: false,
      message: "User Signed Out successfully.",
      success: true,
    });
  } catch (error) {
    res.status(401)
    .json({
      error: true,
      message: error.message || error,
      success: false,
    });
  }
    
}
