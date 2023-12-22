const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
  verified: {
    type: Boolean,
    default: false,
  },
  challenges: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Business", businessSchema);
