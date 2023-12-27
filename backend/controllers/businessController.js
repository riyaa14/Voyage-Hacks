// import User from "../models/user";
const Business = require("../models/business");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET2, { expiresIn: "3d" });
};

// login user
const loginBusiness = async (req, res) => {
  // we receive email and password from client
  const { email, password } = req.body;

  // try to log in
  try {
    const business = await Business.login(email, password);
    console.log(business._id);

    // create token
    const token = createToken(business._id);
    res.status(200).json({ email, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// signup user
const signupBusiness = async (req, res) => {
  const { name, email, password, description, address } = req.body;

  try {
    const business = await Business.signup(
      name,
      email,
      password,
      description,
      address
    );

    const token = createToken(business._id);

    res.status(200).json({ name, email, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }

  // res.json({ mssg: "signup user" });
};

module.exports = { signupBusiness, loginBusiness };
