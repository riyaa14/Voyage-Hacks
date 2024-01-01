const Challenge = require("../models/challenge");
const Request = require("../models/requests");
const generatePin = require("generate-pincode");
const admin = require("firebase-admin");
const uuid = require("uuid-v4");

// firebase
var serviceAccount = require("../voyage-hacks-firebase-adminsdk-kvk3n-6384727ef4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://voyage-hacks.appspot.com",
});

const bucket = admin.storage().bucket();

// Get all challenges - autherized users only
const getChallenges = async (req, res) => {
  const category = req.query.category; // string
  const location = req.query.location; // string

  console.log(location);
  console.log(category);

  try {
    // if (category && location) {
    //   var data = await Challenge.find({
    //     category: { $in: category },
    //     "location.address": location,
    //   }); // filtered based on category as well as location
    // } else if (category) {
    //   var data = await Challenge.find({
    //     category: { $in: category },
    //   }); // filtered based on category
    // } else if (location) {
    //   var data = await Challenge.find({
    //     "location.address": location,
    //   }); // filtered based on location only
    // } else var data = await Challenge.find({}); // all challenges (no filter)

    const query = {};

    if (category) {
      query.category = { $in: Array.isArray(category) ? category : [category] };
    }

    if (location) {
      query["location.address"] = location;
    }

    //const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;

    if (maxPrice !== undefined) {
      query.price = { $lte: maxPrice };
    }

    const data = await Challenge.find(query);

    res.json(data);
  } catch (e) {
    res.status(401).json({ mssg: e.message });
  }
};

// get all challenges posted by a business - business auth reqd
const getChallengesForBusiness = async (req, res) => {
  try {
    const businessId = req.business._id;
    const challengesData = await Challenge.find({ businessId: businessId });
    res.status(200).json({ challengesData });
  } catch (e) {
    res.status(401).json({ msg: e.message });
  }
};

// post a Challenges - authorized business only
const postChallenge = async (req, res) => {
  try {
    const businessId = req.business._id;
    const newChallengeData = {
      businessId: businessId,
      businessName: req.business.name,
      image: req.image,
      timimgs: req.timings,
      contact: req.contact,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      location: {
        address: req.body.address,
        coordinates: [req.body.longitude, req.body.latitude],
      },
      points: req.body.points,
      price: req.body.price,
      completedBy: 0,
    };

    const newChallenge = await Challenge.create(newChallengeData);

    res.status(200).json({
      success: true,
      msg: "challenge added",
      newChallenge,
    });
  } catch (e) {
    res.status(401).json({
      success: false,
      msg: e.message,
    });
  }
};

// updating a challenge - auth business only
() => {};
// deleting a challenge - auth business only
() => {};

// get one challenge details - auth users only
const getOneChallenge = async (req, res) => {
  try {
    const challenge = Challenge.findById(req.params.challengeId);
    if (!challenge) {
      res.status(401).json({ mssg: "no such challenge exists" });
    }
    res.status(200).json({
      mssg: "challenge found",
      challenge,
    });
  } catch (e) {
    res.status(401).json({ mssg: e.message });
  }
};

// Creation of request : user enrolls in a challenge - auth users only
const enrollInChallenge = async (req, res) => {
  try {
    const code = generatePin(8);
    const challengeId = req.params.challengeId;
    const challenge = await Challenge.findById(req.params.challengeId);

    const exists = await Request.find({
      challengeId: challengeId,
      userId: req.user._id,
    });

    console.log(exists);

    if (exists.length != 0) {
      res.json({
        msg: "already enrolled",
      });
    }

    const newPartnershipData = {
      businessId: challenge.businessId,
      challengeId: req.params.challengeId,
      userId: req.user._id,
      userName: req.user.name,
      completedReqs: 0,
      code: code,
    };

    const newReq = await Request.create(newPartnershipData);

    // add userId to challenge
    //const challenge = await Challenge.findById(challengeId);
    challenge.agentsEnrolled.push(req.user._id);
    await challenge.save();

    // add challenge completed for the user record
    // const user = await User.findById();
    req.user.challengesEnrolled.push(challengeId);
    await req.user.save();

    res.status(200).json({ mssg: "enrolled", pin: code }); // we're sending the PIN to the user
  } catch (e) {
    res.status(401).json({ mssg: e.message });
  }
};

const uploadImg = async (req, res) => {
  try {
    // const dateTime = Date.now();

    // const storageRef = ref(
    //   storage,
    //   `files/${req.file.originalname + "       " + dateTime}`
    // );

    // Create file metadata including the content type
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuid(),
      },
      contentType: req.file.mimetype,
      cacheControl: "public, max-age=31536000",
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("File successfully uploaded.");
    return res.send({
      message: "file uploaded to firebase storage",
      name: req.file.originalname,
      type: req.file.mimetype,
      downloadURL: downloadURL,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  getChallenges,
  getOneChallenge,
  getChallengesForBusiness,
  enrollInChallenge,
  postChallenge,
  uploadImg,
};
