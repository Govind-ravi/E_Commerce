async function userSignOutController(req, res) {
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

export default userSignOutController;