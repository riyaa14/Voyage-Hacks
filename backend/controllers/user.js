// import User from "../models/user";
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const generatePin = require("generate-pincode");
const Requests = require("../models/requests");
const Challenge = require("../models/challenge");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  // we receive email and password from client
  const { email, password } = req.body;

  // try to log in
  try {
    const user = await User.login(email, password);
    console.log(user._id);

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
    var agentCode = generatePin(4);
    agentCode = name + agentCode.toString();
    console.log(agentCode); // problem might occur here

    const user = await User.signup(name, email, password, agentCode);

    const token = createToken(user._id);

    res.status(200).json({ name, email, token, agentCode });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }

  // res.json({ mssg: "signup user" });
};

const getUserDetails = async (req, res) => {
  try {
    const requests = await Requests.find({ userId: req.user._id });

    const completedTasks = [];

    for (const request of requests) {
      // Extract the desired properties from each JSON object
      const { challengeId, completedReqs } = request;

      // get name of challenge
      const challenge = await Challenge.findById(challengeId);
      const challengeName = challenge.name;

      // Store the extracted properties in the new array
      completedTasks.push({ challengeName, completedReqs });
    }

    res.status(200).json({
      profilePicture:
        "https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg",
      name: req.user.name,
      email: req.user.email,
      contact: req.user.contact,
      agentCode: req.user.agentCode,
      points: req.user.points,
      completedTasks: completedTasks,
    });
  } catch (e) {
    res.status(400).json({ mssg: e.message });
  }
};

module.exports = { signupUser, loginUser, getUserDetails };
