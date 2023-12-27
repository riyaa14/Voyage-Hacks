const express = require("express");
const requireUserAuth = require("../middleware/auth");
const requireBusinessAuth = require("../middleware/businessAuth");
const {
  getChallenges,
  getChallengesForBusiness,
  postChallenge,
  getOneChallenge,
  enrollInChallenge,
} = require("../controllers/challengeController");

const router = express.Router();
// require auth for all routes
//router.use(requireAuth);

router.get("/", requireUserAuth, getChallenges);
router.get(
  "/businessChallenges",
  requireBusinessAuth,
  getChallengesForBusiness
);
router.post("/createChallenge", requireBusinessAuth, postChallenge);
router.get("/:challengeId", requireUserAuth, getOneChallenge);
router.post(":challengeId", requireUserAuth, enrollInChallenge);

module.exports = router;
