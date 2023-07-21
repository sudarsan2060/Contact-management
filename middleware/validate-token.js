const asynchandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const validateToken = asynchandler(async (req, res, next) => {
  let token;
  let autherized = req.headers.Authorization || req.headers.authorization;
  if (autherized && autherized.startsWith("Bearer")) {
    token = autherized.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }

      req.user = decode.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not autherized or token is missing");
    }
  }
});

module.exports = validateToken;
