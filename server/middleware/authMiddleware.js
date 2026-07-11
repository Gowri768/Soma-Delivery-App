import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Get token from request header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Remove "Bearer " if present
    const actualToken = token.startsWith("Bearer ")
      ? token.slice(7)
      : token;

    // Verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    console.log(decoded);

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;