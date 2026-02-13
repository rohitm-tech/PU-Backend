const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");

class AuthService {
  async signup({ name, email, password }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      throw error;
    }

    const user = await User.create({ name, email, password });
    const token = this._generateToken(user);

    return {
      token,
      user: { id: user._id, name: user.name, email: user.email },
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const token = this._generateToken(user);

    return {
      token,
      user: { id: user._id, name: user.name, email: user.email },
    };
  }

  _generateToken(user) {
    return jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });
  }
}

module.exports = new AuthService();
