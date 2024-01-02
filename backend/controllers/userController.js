const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/sendToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;

//Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  let userData = { name, email, password };

  if (avatar) {
    const myCloud = await cloudinary.uploader.upload(avatar, {
      folder: 'ElectroShop/avatars',
      width: 1000,
      height: 1000,
      crop: 'scale',
    });

    userData = {
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };
  }

  const user = await User.create(userData);

  sendToken(user, 201, res);
});

//Login a User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler('Please Enter Email and Password.', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password.', 401));
  }

  const isMatchPassword = await user.comparePassword(password);
  if (!isMatchPassword) {
    return next(new ErrorHandler('Invalid Email or Password.', 401));
  }

  sendToken(user, 200, res);
});

//Logout a user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged Out',
  });
});

//forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler('User not found.', 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  let resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/password/reset/${resetToken}`;

  if (process.env.NODE_ENV !== 'PRODUCTION') {
    resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  }

  const message = `Your password reset url is: \n\n ${resetPasswordUrl} \n\n If you have not requested this then please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Eccommerce Password Recovery',
      message,
    });

    res.status(200).json({
      success: true,
      message: `Message sent to ${user.email}.`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500));
  }
});

//reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        'Reset password token is invalid or has been expired.',
        404
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler('Confirm password does not match with password.', 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password reset success.',
  });
});

//Get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

//update user password
exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword) {
    return next(new ErrorHandler('Please Enter old password.', 400));
  }

  const user = await User.findById(req.user.id).select('+password');

  const isMatchPassword = await user.comparePassword(oldPassword);

  if (!isMatchPassword) {
    return next(new ErrorHandler('Old password is incorrect.'), 400);
  }

  if (newPassword !== confirmPassword) {
    return next(
      new ErrorHandler('New password does not match with confirm password.'),
      400
    );
  }

  user.password = newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//update user profile
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  let { name, email, avatar } = req.body;
  let userData = { name, email };

  if (avatar) {
    const myCloud = await cloudinary.uploader.upload(avatar, {
      folder: '/ElectroShop/avatars',
      width: 1000,
      height: 1000,
      crop: 'scale',
    });

    avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    const imageId = req.user.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);

    userData = { name, email, avatar };
  }

  const user = await User.findByIdAndUpdate(req.user.id, userData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: 'User profile updated successfully.',
    updatedUser: user,
  });
});

//Get all user --admin
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get single user --admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//update user role -- admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  if (req.params.id === req.user.id) {
    return next(new ErrorHandler("You can't change your own role.", 403));
  }

  const newUserData = {
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: 'User role updated successfully.',
  });
});

//delete user -- admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id: ${req.params.id}`, 404)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: 'User deleted successfully.',
  });
});
