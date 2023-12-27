const Challenge = require("../models/challenge");
const Request = require("../models/requests");
const TokenGenerator = require("totp-generator-ts");

// Get all challenges - autherized users only
const getChallenges = async (req, res) => {
  const categories = JSON.parse(req.query.category);
  const location = JSON.parse(req.query.location);

  //const categories = 0;
  //const location = 0;

  try {
    if (categories.length && location) {
      var data = await Challenge.find({
        category: { $in: categories },
        location: {
          address: location,
        },
      }); // filtered based on category as well as location
    } else if (categories.length) {
      var data = await Challenge.find({
        category: { $in: categories },
      }); // filtered based on category
    } else if (location) {
      var data = await Challenge.find({
        location: {
          address: location,
        },
      }); // filtered based on location only
    } else var data = await Challenge.find({}); // all challenges (no filter)

    res.json(data);
  } catch (e) {
    res.status(401).json({ mssg: e.message });
  }
};

// get all challenges posted by a business - business auth reqd
const getChallengesForBusiness = async (req, res) => {
  try {
    const businessId = req.business._id;
    const challengesData = await Challenge.find({ businessId: businessId });
    res.status(200).json({ challengesData });
  } catch (e) {
    res.status(401).json({ msg: e.message });
  }
};

// post a Challenges - authorized business only
const postChallenge = async (req, res) => {
  try {
    const businessId = req.business._id;
    const newChallengeData = {
      businessId: businessId,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      vehicleNeeded: null,
      location: {
        address: req.body.address,
        coordinates: [req.body.longitude, req.body.latitude],
      },
      points: req.body.points,
      completedBy: 0,
    };

    const newChallenge = await Challenge.create(newChallengeData);

    res.status(200).json({
      success: true,
      msg: "challenge added",
      newChallenge,
    });
  } catch (e) {
    res.status(401).json({
      success: false,
      msg: e.message,
    });
  }
};

// updating a challenge - auth business only
() => {};
// deleting a challenge - auth business only
() => {};

// get one challenge details - auth users only
const getOneChallenge = async (req, res) => {
  try {
    const challenge = Challenge.findById(req.params.challengeId);
    if (!challenge) {
      res.status(401).json({ mssg: "no such challenge exists" });
    }
    res.status(200).json({
      mssg: "challenge found",
      challenge,
    });
  } catch (e) {
    res.status(401).json({ mssg: e.message });
  }
};

// Creation of request : user enrolls in a challenge - auth users only
const enrollInChallenge = async (req, res) => {
  try {
    const code = new TokenGenerator();
    const challenge = await Challenge.findById(req.params.challengeId);

    const newReqData = {
      businessId: challenge.businessId,
      challengeId: req.params.challengeId,
      userId: req.user._id,
      userName: req.user.name,
      code: code,
    };

    const newReq = await Request.create(newReqData);
    res.status(200).json({ mssg: "enrolled", pin: code }); // we're sending the PIN to the user
  } catch (e) {
    res.status(401).json({ mssg: e.message });
  }
};

module.exports = {
  getChallenges,
  getOneChallenge,
  getChallengesForBusiness,
  enrollInChallenge,
  postChallenge,
};
