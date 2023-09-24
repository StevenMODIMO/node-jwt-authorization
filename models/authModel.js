const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Weak Password");
  }

  const user = await this.findOne({ email });

  if (user) {
    throw Error("User exists.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const new_user = await this.create({ email, password: hash });
  return new_user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password.");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
