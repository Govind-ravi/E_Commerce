import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
export async function userSignUpController(req, res) {
  try {
    const { name, email, password, profilePicture, gender, role } = req.body;

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
      gender,
      role,
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
      secure: process.env.NODE_ENV === "production",
      sameSite: 'None'
    };

    res.cookie("token", token, tokenOption);
    res.status(201).json({
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
    return bcrypt.compare(password1, password2);
  }

  try {
    const { email, password } = req.body;

    // Find the user
    const user = await userModel.findOne({
      email: new RegExp(`^${email}$`, "i"),
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", error: true, success: false });
    }

    // Check password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401) // Use 401 Unauthorized for incorrect password
        .json({ message: "Wrong Password!", error: true, success: false });
    }

    // Create token
    const tokenData = {
      _id: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    const tokenOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure this is set for production environments
      sameSite: 'None'
    };

    // Send response with token
    res.cookie("token", token, tokenOption).status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User Signed in successfully",
    });
    console.log(token);
    
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}

export async function userSignOutController(req, res) {
  try {
    res.clearCookie("token").status(200).json({
      error: false,
      message: "User Signed Out successfully.",
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      error: true,
      message: error.message || error,
      success: false,
    });
  }
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No account with that email address exists." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetUrl = `http://${req.headers.host}/reset/${resetToken}`;
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset Request",
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
      Please make a PUT request to the following URL with your new password:\n\n
      ${resetUrl}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    res.status(500).json({ message: "Error sending password reset email." });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired." });
    }

    user.password = password;
    user.resetPasswordToken = "";
    user.resetPasswordExpires = Date.now();

    await user.save();

    res.status(200).json({ message: "Password has been reset." });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password.", error });
  }
};
