// authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to check if user is authenticated
const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have set JWT_SECRET in your environment variables
    req.userId = decoded.id; // Assuming your token payload has a field named "id"
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Token is invalid" });
  }
};

module.exports = authMiddleware;
