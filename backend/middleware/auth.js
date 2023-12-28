const jwt = require("jsonwebtoken");
const User = require("../models/user");
//const secret = process.env.SECRET;

const requireUserAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Auth Token Reqd" });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.SECRET);

    // attaching user property to req
    req.user = await User.findOne({ _id });
    console.log(req.user);
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: "request not authorized" });
  }
};

module.exports = requireUserAuth;
