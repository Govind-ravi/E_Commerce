import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export async function userProfileController(req, res) {
  try {
    const currentUser = await userModel.findById(req.userId);
    
    res.status(200).json({
      data: currentUser,
      error: false,
      success: true,
      message: "User profile fetched successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || error, error: true, success: false });
  }
}

export const updateUserProfileController = async (req, res) => {
  async function comparePassword(password1, password2) {
    const valid = await bcrypt.compare(password1, password2);
    return valid;
  }
  
  const { name, email, profilePicture } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser && existingUser._id.toString() !== req.userId) {
      return res.status(400).json({ message: "Email is already registered.", error: true });
    }

    // Update user details
    const updatedUser = await userModel.findByIdAndUpdate(
      req.userId,
      { name, email, profilePicture },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", error: true });
    }

    res.status(200).json({ message: "User profile updated successfully", data: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message || error, error: true });
  }
};

export const updateUserPasswordController = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {

    const currentUser = await userModel.findById(req.userId);

    const isMatch = await comparePassword(currentPassword, currentUser.password);
    if(!isMatch){
      return res.status(400).json({ message: "Current Password is Wrong!", error: true });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    const updatedUser = await userModel.findByIdAndUpdate(
      req.userId,
      { password: hashedPassword },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", error: true });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message || error, error: true });
  }
};

export const userRemoveAddress = async (req, res)=>{
  const {id, addressName} = req.body 
  try {
    const currentUser = await userModel.findByIdAndUpdate(id, {$pull:{address: {name: addressName}}}, {
      new: true,
      runValidators: true,
    });
    
    if (!currentUser) {
      res.status(404).json({ message: "User not found", error: true, success: false });
      return;
    }
    res.status(200).json({
      data: currentUser,
      error: false,
      success: true,
      message: "User profile fetched successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || error, error: true, success: false });
  }
}
export async function userAddressController(req, res) {
  const { id, address } = req.body;
  try {
    const currentUser = await userModel.findByIdAndUpdate(id, {$push:{address: address}}, {
      new: true,
      runValidators: true,
    });
    if (!currentUser) {
      res.status(404).json({ message: "User not found", error: true, success: false });
      return;
    }
    res.status(200).json({
      data: currentUser,
      error: false,
      success: true,
      message: "User profile fetched successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || error, error: true, success: false });
  }
}