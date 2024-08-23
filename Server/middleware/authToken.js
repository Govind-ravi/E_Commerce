import jwt from "jsonwebtoken";

const authToken = (req, res, next) => {
  try {
    const token =  req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No user logged in", error: true, success: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, function (error, decoded) {
      if (error) {
        return res.status(403).json({ message: "Invalid token", error: true, success: false });
      } else {
        req.userId = decoded?._id;
        next();
      }
    });
  } catch (error) {
    res.status(400).json({ data: [], message: error.message, error: true, success: false });
  }
};

export default authToken;

