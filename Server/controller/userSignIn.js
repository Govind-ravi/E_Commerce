import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

async function comparePassword(password1, password2) {
  const valid = await bcrypt.compare(password1, password2);
  return valid;
}

async function userSignInController(req, res) {
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
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User Signed in successfully",
    });
  } catch (error) {
    res.json({ message: error.message || error, error: true, success: false });
  }
}

export default userSignInController;
