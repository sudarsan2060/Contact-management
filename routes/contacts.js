const express = require("express");
const {
  getAllContacts,
  getContact,
  updateContact,
  deleteContact,
  addContact,
} = require("../controller.js/contact_controller");
const router = express.Router();
const validateToken = require("../middleware/validate-token");

router.route("/").get(validateToken, getAllContacts);
router.route("/").post(validateToken, addContact);
router.route("/:id").get(validateToken, getContact);
router
  .route("/:id")
  .put(validateToken, updateContact)
  .delete(validateToken, deleteContact);

module.exports = router;
