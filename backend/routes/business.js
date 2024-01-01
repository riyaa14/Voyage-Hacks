// import express from "express";
const express = require("express");

// controller functions
const {
  loginBusiness,
  signupBusiness,
  getBusinessDetails,
} = require("../controllers/businessController");
const requireBusinessAuth = require("../middleware/businessAuth");

const router = express.Router();

//login route
router.post("/login", loginBusiness);

// signup route
router.post("/signup", signupBusiness);

router.get("/", requireBusinessAuth, getBusinessDetails);

module.exports = router;
