const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  // Basic user information
  name: {
    type: String,
    required: true,
  },
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true, // ensures no duplicate usernames
  // },
  email: {
    type: String,
    required: true,
    unique: true, // ensures no duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
  // Points earned through challenges
  points: {
    type: Number,
    default: 0,
  },
  // Completed challenges
  challengesDone: [
    {
      type: String,
    },
  ],
  // Trips booked by the user
  tripsBooked: [
    {
      // Trip details
      location: {
        address: {
          type: String,
          //required: true,
        },
        coordinates: {
          type: [Number],
          //required: true,
        },
      },
      numberOfMembers: {
        type: Number,
        //required: true,
      },
      vehiclePreferences: {
        type: [String],
        enum: ["car", "bus", "train", "airplane"],
      },
      activityPreferences: {
        type: [String],
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
      dates: {
        startDate: {
          type: Date,
          //required: true,
        },
        endDate: {
          type: Date,
          //required: true,
        },
      },
    },
  ],
});

// static signup method
userSchema.statics.signup = async function (name, email, password) {
  const emailExists = await this.findOne({ email });
  //const usernameExists = await this.findOne({username})

  if (emailExists) {
    throw Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });

  return user;
};

// login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Fields can't be empty");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
