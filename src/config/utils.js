const sendSuccess = (res, data, message = "Success", statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (
  res,
  error,
  message = "An error occurred",
  statusCode = 400
) => {
  res.status(statusCode).json({
    success: false,
    message,
    error: error.message || error,
  });
};

module.exports = {
  sendSuccess,
  sendError,
};
