const { constants } = require("./constants");

const errorhandler = (err, req, res, next) => {
  const statuscode = res.statuscode ? res.statuscode : 500;
  switch (statuscode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation error",
        msg: err.msg,
        stackTracer: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({ title: "not found", msg: err.msg, stackTracer: err.stack });
      break;
    case constants.SERVER_ERROR:
      res.json({ title: "server error", msg: err.msg, stackTracer: err.stack });
      break;
    case constants.UNAUTHORIZED:
      res.json({ title: "unauthorized", msg: err.msg, stackTracer: err.stack });
      break;
    case constants.FORBIDDEN:
      res.json({ title: "forbidden", msg: err.msg, stackTracer: err.stack });
      break;
    default:
      console.log("No error");
      break;
  }
};

module.exports = errorhandler;
