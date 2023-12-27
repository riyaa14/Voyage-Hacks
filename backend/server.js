const dotenv = require("dotenv");
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// import userRoutes from "./routes/user";
const userRoutes = require("./routes/user");
const challengesRoutes = require("./routes/challenge");
const businessRoutes = require("./routes/business");
const requestRoutes = require("./routes/request");

// an express app
const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/user", userRoutes);
app.use("/api/challenges", challengesRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/requests", requestRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening to PORT", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
