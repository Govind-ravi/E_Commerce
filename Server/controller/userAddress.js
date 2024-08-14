import userModel from "../models/userModel.js";

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
async function userAddressController(req, res) {
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

export default userAddressController;