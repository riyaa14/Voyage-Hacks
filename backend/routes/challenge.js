const express = require("express");
const requireAuth = require("../middleware/auth");

const router = express.Router();
// require auth for all routes
router.use(requireAuth);

router.get("/", (req, res) => {
  res.status(200).json({ mssg: "here are challenges recommendations for you" });
});

module.exports = router;
