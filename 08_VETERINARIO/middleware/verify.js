const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify = (req, res, next) => {
  console.log(req);
  if (!req.headers.authorization) {
    return res.send("No viene token");
  }
  const header = req.headers.authorization;
};

module.exports = verify;
