const express = require("express");
const requireBusinessAuth = require("../middleware/businessAuth");
const {
  getRequests,
  verificationOfChallenge,
} = require("../controllers/requestsController");

const router = express.Router();
// router.get("/", requireBusinessAuth, getRequests);
router.post("/verify", requireBusinessAuth, verificationOfChallenge);

module.exports = router;
