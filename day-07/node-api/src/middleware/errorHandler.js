const config = require("../config/env");

module.exports = function errorHandler(error, req, res, _next) {
  const status = Number(error.statusCode) || 500;
  const code = error.code || "INTERNAL_SERVER_ERROR";
  const message = status >= 500 && config.nodeEnv === "production" ? "An unexpected server error occurred" : error.message || "Unexpected server error";
  if (status >= 500) console.error(`[${req.requestId || "no-request-id"}]`, error);
  res.status(status).json({
    success: false,
    error: {
      code,
      message,
      ...(error.details ? { details: error.details } : {}),
      ...(config.nodeEnv !== "production" ? { requestId: req.requestId } : {}),
    },
  });
};
