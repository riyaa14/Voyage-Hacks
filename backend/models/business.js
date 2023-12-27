const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
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
      //required: true,
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

// static signup method
businessSchema.statics.signup = async function (
  name,
  email,
  password,
  description,
  address
) {
  const emailExists = await this.findOne({ email });
  //const usernameExists = await this.findOne({username})

  if (emailExists) {
    throw Error("Business already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // get live location of business and store that as well
  () => {};

  const business = await this.create({
    name,
    email,
    password: hash,
    description,
    location: { address: address },
  });

  return business;
};

// login method
businessSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Fields can't be empty");
  }

  const business = await this.findOne({ email });

  if (!business) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, business.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return business;
};

module.exports = mongoose.model("Business", businessSchema);
