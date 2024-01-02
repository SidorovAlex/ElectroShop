const sendToken = (user, statusCode, res) => {
  const token = user.generateAuthToken();

  res.status(statusCode).cookie('token', token).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
