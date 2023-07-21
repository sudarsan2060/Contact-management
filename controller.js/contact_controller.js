const asynchandler = require("express-async-handler");
const Contact = require("../models/contactsModel");

const getAllContacts = asynchandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});
const getContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(201).json(contact);
});
const addContact = asynchandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    user_id: req.user.id,
    name,
    email,
    phone,
  });
  res.status(201).json({ contact });
});

const updateContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error("User not have permission to others contacts");
  }
  const updatecontact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(201).json(updatecontact);
});
const deleteContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error("User not have permission to others contacts");
  }

  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getAllContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};
