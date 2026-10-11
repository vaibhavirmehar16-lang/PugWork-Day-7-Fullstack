const { randomUUID } = require("node:crypto");

module.exports = function requestId(req, res, next) {
  req.requestId = randomUUID();
  res.setHeader("X-Request-Id", req.requestId);
  next();
};
