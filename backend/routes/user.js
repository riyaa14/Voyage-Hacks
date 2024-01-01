// import express from "express";
const express = require("express");

// controller functions
const {
  signupUser,
  loginUser,
  getUserDetails,
} = require("../controllers/user");
const requireUserAuth = require("../middleware/auth");

const router = express.Router();

//login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

router.get("/", requireUserAuth, getUserDetails);

module.exports = router;
