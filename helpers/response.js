const success = (res, statusCode, message, data ,token) => {
  res.status(200).json({
    status: statusCode,
    message: message,
    data: data,
    token:token,
  });
};

const status200 = (res, message = "Success") => {
  res.status(200).json({
    status: "200",
    message,
  });
};

module.exports = {
  success,
  status200,
};
