const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  businessId: {
    type: String,
    required: true,
  },
  challengeId: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  code: {
    type: Number,
    require: true,
  },
  createdAt: { type: Date, expires: "12h", default: Date.now },
});

module.exports = mongoose.model("Request", requestSchema);
