const AppError = require("../utils/AppError");

module.exports = function validate(schema, source = "body") {
  return function validationMiddleware(req, _res, next) {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return next(new AppError(400, "VALIDATION_ERROR", "Request validation failed",
        result.error.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message }))));
    }
    if (source === "query") req.validatedQuery = result.data;
    else req[source] = result.data;
    next();
  };
};
