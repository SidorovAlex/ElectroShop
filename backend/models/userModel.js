const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Your Name.'],
    maxlength: [30, 'Name can not exceed 30 characters.'],
    minlength: [4, 'Name should have more than 4 characters.'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Email.'],
    unique: true,
    validate: [validator.isEmail, 'Please Enter a valid Email.'],
  },
  password: {
    type: String,
    required: [true, 'Please Enter Your Password.'],
    match: [
      /^(?=.*\d{4})(?=.*[A-Z])(?=.*[a-z])(?=.*[!@%$#^&*_\-()])[A-Za-z\d!@%$#^&*_\-()]{8,}$/,
      'Password should have at least 4 numbers, one uppercase letter, one lowercase letter, and one special character from the provided set (!@%$#^&*-_) and 8 characters',
    ],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      default: 'not uploaded',
    },
    url: {
      type: String,
      default: 'not uploaded',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: 'user',
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 8);
});

//Generate Authentication Token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

//Compare password with the given password
userSchema.methods.comparePassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

//Generating password reset token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('Users', userSchema);

module.exports = User;
