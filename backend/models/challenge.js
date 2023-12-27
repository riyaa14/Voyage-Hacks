const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  businessId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Array,
  },
  vehicleNeeded: {
    type: [String],
    enum: ["car", "bus", "train", "airplane"],
  },
  location: {
    address: {
      type: String,
      required: true,
    },
    coordinates: {
      type: [String],
      required: true,
    },
  },
  points: {
    type: Number,
    required: true,
  },
  completedBy: {
    type: [String],
  },
});

module.exports = mongoose.model("Challenge", challengeSchema);
