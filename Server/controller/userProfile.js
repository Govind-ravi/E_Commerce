import userModel from "../models/userModel.js";

async function userProfileController(req, res) {
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

export default userProfileController;
