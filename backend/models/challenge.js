const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  businessId: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.travelandleisure.com%2F25-of-the-world-s-most-incredible-hiking-trails-7501816&psig=AOvVaw0gb_QQipAMHVeaj30kZn8I&ust=1704192101733000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNDW3sWAvIMDFQAAAAAdAAAAABAD",
  },
  timings: {
    type: String,
  },
  contact: {
    type: String,
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
  price: {
    type: Number,
    required: true,
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
  agentsEnrolled: {
    type: [String],
  },
});

module.exports = mongoose.model("Challenge", challengeSchema);
