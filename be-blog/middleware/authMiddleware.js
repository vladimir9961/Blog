const jwt = require("jsonwebtoken");

// Middleware for verifying the token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }

    // You can access the user's information in the `decoded` object
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
