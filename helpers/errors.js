//Server Errors
const error500 = (res, err) => {
  res.status(500).json({
    status: "500",
    error_msg: `Unexpected Error: ${err}`,
  });
};

//Not Found
const error404 = (res, message) => {
  res.status(404).json({
    status: "404",
    error_msg: message,
  });
};

//bad request
const error400 = (res, message) => {
  res.status(400).json({
    status: "400",
    error_msg: message,
  });
};

//Already Exists
const error409 = (res, message) => {
  res.status(409).json({
    status: "409",
    error_msg: message,
  });
};

//Custom Error
const customError = (res, statusCode, message) => {
  res.status(statusCode).json({
    status: statusCode,
    error_msg: message,
  });
};

module.exports = {
  error500,
  error404,
  error400,
  error409,
  customError,
};
