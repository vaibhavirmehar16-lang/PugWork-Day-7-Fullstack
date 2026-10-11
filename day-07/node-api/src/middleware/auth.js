const jwt = require("jsonwebtoken");
const config = require("../config/env");
const AppError = require("../utils/AppError");

function requireAuth(req, _res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    return next(new AppError(401, "AUTH_REQUIRED", "A valid Bearer token is required"));
  }
  try {
    req.user = jwt.verify(token, config.jwtSecret);
    next();
  } catch {
    next(new AppError(401, "INVALID_TOKEN", "Token is invalid or expired"));
  }
}
module.exports = { requireAuth };
