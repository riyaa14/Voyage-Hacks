// import express from "express";
const express = require("express");

// controller functions
const {
  loginBusiness,
  signupBusiness,
} = require("../controllers/businessController");

const router = express.Router();

//login route
router.post("/login", loginBusiness);

// signup route
router.post("/signup", signupBusiness);

module.exports = router;
