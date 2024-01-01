const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  // Basic user information
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensures no duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
  // Points earned through challenges
  points: {
    type: Number,
    default: 0,
  },
  // Completed challenges ids
  challengesEnrolled: {
    type: [String],
  },
  agentCode: {
    type: String,
  },
});

// static signup method
userSchema.statics.signup = async function (name, email, password, agentCode) {
  const emailExists = await this.findOne({ email });
  //const usernameExists = await this.findOne({username})

  if (emailExists) {
    throw Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash, agentCode });

  return user;
};

// login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Fields can't be empty");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
