const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add  the username"],
    },
    email: {
      type: String,
      required: [true, "please add email address"],
      unique: [true, "email address is already registered"],
    },
    password: {
      type: String,
      required: [true, "please provide password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserDetails", userSchema);
