const express = require("express");
const multer = require("multer");
const requireUserAuth = require("../middleware/auth");
const requireBusinessAuth = require("../middleware/businessAuth");
const {
  getChallenges,
  getChallengesForBusiness,
  postChallenge,
  getOneChallenge,
  enrollInChallenge,
  uploadImg,
} = require("../controllers/challengeController.js");
// const admin = require("firebase-admin");
// const uuid = require("uuid-v4");

const router = express.Router();
// require auth for all routes
//router.use(requireAuth);

// // firebase
// var serviceAccount = require("../voyage-hacks-firebase-adminsdk-kvk3n-6384727ef4.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: "gs://voyage-hacks.appspot.com",
// });

// const bucket = admin.storage().bucket();

// Setting up multer as a middleware to grab photo uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

router.get("/", requireUserAuth, getChallenges);
router.get(
  "/businessChallenges",
  requireBusinessAuth,
  getChallengesForBusiness
);
router.post("/createChallenge", requireBusinessAuth, postChallenge);
router.get("/:challengeId", requireUserAuth, getOneChallenge);
router.post("/enroll/:challengeId", requireUserAuth, enrollInChallenge);
router.post("/uploadImg", [requireBusinessAuth, upload], uploadImg);

module.exports = router;
