import jwt from "jsonwebtoken";

export const authController = (req, res, next) => {
  try {
    // Retrieve token from Authorization header
    const token = req.headers.authorization; // Assumes Bearer token format

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is not provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info to the request object for downstream usage
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Handle token-related errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token provided.",
      });
    }

    // Handle expired token errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired.",
      });
    }

    // General error handling
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
