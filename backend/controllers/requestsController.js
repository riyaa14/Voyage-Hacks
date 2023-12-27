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

// Deletion of request: verify completion of challenge - auth business only
// 3 things -
// deletion of req,
// add points for user, send a notification or add that challengeId to user record
// add the userId to challenge record
const verificationOfChallenge = async (req, res) => {
  try {
    const request = await Request.findById(req.params.reqID);
    const userId = request.userId;
    const challengeId = request.challengeId;

    if (req.body.code == request.code) {
      // add userId to challenge
      const challenge = await Challenge.findById(challengeId);
      challenge.completedBy.push(userId);

      // add challenge completed for the user record
      const user = await User.findById(userId);
      user.challengesDone.push(challengeId);
      // add points
      user.points = user.points + challenge.points;

      // delete request document
      const deleteReq = await Request.findByIdAndDelete(req.params.reqID);

      res.status(200).json({
        userPts: user.points,
        msg: "userId added to challenge record, challengeid added to user rec, user points updated, request document deleted",
      });
    } else {
      res.status(401).json({ msg: "invalid code" });
    }
  } catch (e) {
    res.status(401).json({ msg: e.message });
  }
};

module.exports = { verificationOfChallenge, getRequests };
