const Challenge = require("../models/challenge");
const Request = require("../models/requests");
const User = require("../models/user");

// get all requests - auth business only
// search by name or email of user
const getRequests = async (req, res) => {
  try {
    const businessid = req.business._id;
    const requests = await Request.find({ businessId: businessid }).sort({
      createdAt: -1,
    });

    res.status(200).json({ requests });
  } catch (e) {
    res.status(401).json({ mssg: e.message });
  }
};

// verify completion of challenge - auth business only
const verificationOfChallenge = async (req, res) => {
  try {
    // const request = await Request.findById(req.params.reqID);
    // const userId = request.userId;
    // const challengeId = request.challengeId;

    // if (req.body.code == request.code) {
    //   // add userId to challenge
    //   const challenge = await Challenge.findById(challengeId);
    //   challenge.completedBy.push(userId);

    //   // add challenge completed for the user record
    //   const user = await User.findById(userId);
    //   user.challengesDone.push(challengeId);
    //   // add points
    //   user.points = user.points + challenge.points;

    // delete request document
    // const deleteReq = await Request.findByIdAndDelete(req.params.reqID);

    const request = await Request.find({ code: req.body.code });
    console.log(request);
    const userId = request[0].userId;
    const challengeId = request[0].challengeId;

    if (request) {
      // add points
      const challenge = await Challenge.findById(challengeId);
      console.log(challenge);
      const user = await User.findById(userId);
      console.log(user);

      user.points = user.points + challenge.points;
      user.save();

      // increase the transaction count
      request[0].completedReqs = request[0].completedReqs + 1;
      request[0].save();

      // if 'x' number of transactions are completed then travel agent will have to pay
      // if a month has passed even then the travel agent needs to pay

      res.status(200).json({
        userPts: user.points,
        completed: request[0].completedReqs,
        msg: "user points updated and transaction recorded",
      });
    } else {
      res.status(401).json({ msg: "invalid code" });
    }
  } catch (e) {
    res.status(401).json({ msg: e.message });
  }
};

module.exports = { verificationOfChallenge, getRequests };
