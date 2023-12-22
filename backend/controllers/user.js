// import User from "../models/user";
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  // we receive email and password from client
  const { email, password } = req.body;

  // try to log in
  try {
    const user = User.login(email, password);

    // create token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    const token = createToken(user._id);

    res.status(200).json({ name, email, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }

  // res.json({ mssg: "signup user" });
};

module.exports = { signupUser, loginUser };
