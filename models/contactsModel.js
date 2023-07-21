const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDetails",
      required: true,
    },
    name: {
      type: String,
      required: [true, "please enter contact name"],
    },
    email: {
      type: String,
      required: [true, "please enter contact email"],
    },
    phone: {
      type: String,
      required: [true, "please enter phone number"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
