const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify = (req, res, next) => {
  //   console.log(req);
  console.log(req.headers, "estos son los headers");
  if (!req.headers.authorization) {
    return res.send("No viene token");
  }

  //   Bearer jfeoiwjoiefpwipofkow.mfowjfoewopeff.jocwjofcj
  const header = req.headers.authorization;
  console.log(header, "esto es lo que me viene en authorization");

  const token = header.split(" ")[1];
  console.log(token, "este es el token");
  jwt.verify(token, process.env.SECRET_KEY, (error, result) => {
    if (error) {
      return res.send("el token no es válido");
    }
    console.log(result);
    next();
  });
};

module.exports = verify;
