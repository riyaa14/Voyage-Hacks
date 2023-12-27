const jwt = require("jsonwebtoken");
const Business = require("../models/business");
//const secret = process.env.SECRET;

const requireBusinessAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Auth Token Reqd" });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const { _id } = jwt.verify(token, process.env.SECRET2);
    // console.log(_id);

    // attaching user property to req
    // req.business = await Business.findOne({ _id }).select("_id");
    req.business = await Business.findOne({ _id });
    console.log(req.business);
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: "request not authorized" });
  }
};

module.exports = requireBusinessAuth;
