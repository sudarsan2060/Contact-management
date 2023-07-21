const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserDetails = require("../models/userModel");
const registerUser = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all feilds are mandatory");
  }
  const existuser = await UserDetails.findOne({ email });
  if (existuser) {
    res.status(400);
    throw new Error("user already exist");
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newuser = await UserDetails.create({
    username,
    email,
    password: hashpassword,
  });

  if (newuser) {
    res.status(201).json({
      msg: "user registered successfully",
      newuser: { _id: newuser._id, email: newuser.email },
    });
  } else {
    res.status(400);
    throw new Error("data is not valid");
  }
});

const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all feilds are mandetory");
  }
  const user = await UserDetails.findOne({ email });

  const ismatch = await bcrypt.compare(password, user.password);

  if (user && ismatch) {
    const accesstoken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.SECRET,
      { expiresIn: process.env.EXPIRY }
    );

    res.status(200).json({ accesstoken });
  } else {
    res.status(404);
    throw new Error("invalid credintials");
  }

  res.status(201).json({ msg: "login successfully" });
});

//private route ,only authenticated user can access;
const currentUser = asynchandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
