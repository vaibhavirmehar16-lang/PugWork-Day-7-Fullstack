const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/env");
const { success } = require("../utils/responses");
const AppError = require("../utils/AppError");

const passwordHash = bcrypt.hashSync(config.adminPassword, 10);

async function login(req, res) {
  const emailMatches = req.body.email.toLowerCase() === config.adminEmail.toLowerCase();
  const passwordMatches = await bcrypt.compare(req.body.password, passwordHash);
  if (!emailMatches || !passwordMatches) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Email or password is incorrect");
  }
  const token = jwt.sign({ sub: config.adminEmail, role: "admin" }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
  return success(res, { token, tokenType: "Bearer", expiresIn: config.jwtExpiresIn });
}

module.exports = { login };
