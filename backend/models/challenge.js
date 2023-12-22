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
  type: {
    type: String,
    enum: [
      "Nightlife",
      "Outdoor",
      "Adventure",
      "Cultural",
      "Foodie",
      "Family-friendly",
      "Relaxation",
    ],
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
      type: [Number],
      required: true,
    },
  },
  points: {
    type: Number,
    required: true,
  },
  qrCode: {
    type: String,
    required: true,
  },
  completedBy: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Challenge", challengeSchema);
