const express = require("express");

const requireUserAuth = require("../middleware/auth");
const requireBusinessAuth = require("../middleware/businessAuth");
const {
  getChallenges,
  getChallengesForBusiness,
  postChallenge,
  getOneChallenge,
  enrollInChallenge,
} = require("../controllers/challengeController.js");
const router = express.Router();

router.get("/", requireUserAuth, getChallenges);
router.get(
  "/businessChallenges",
  requireBusinessAuth,
  getChallengesForBusiness
);
router.post("/createChallenge", requireBusinessAuth, postChallenge);
router.get("/:challengeId", requireUserAuth, getOneChallenge);
router.get("/business/:challengeId", requireBusinessAuth, getOneChallenge);
router.post("/enroll/:challengeId", requireUserAuth, enrollInChallenge);

module.exports = router;
