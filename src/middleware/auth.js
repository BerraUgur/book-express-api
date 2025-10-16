const jwt = require("jsonwebtoken");
const { accessToken, refreshToken } = require("../config/jwtConfig");
const RefreshToken = require("../models/RefreshToken");

// Middleware to verify access token
const verifyAccessToken = (req, res, next) => {
  const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Access token required" });
  }
  try {
    req.user = jwt.verify(token, accessToken.secret);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
};

// Middleware to verify refresh token
const verifyRefreshToken = (req, res, next) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;
  if (!token) {
    return res.status(403).json({ message: "Refresh token required" });
  }
  try {
    if (!RefreshToken.findToken(token)) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    req.user = jwt.verify(token, refreshToken.secret);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };