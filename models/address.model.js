const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    unique: true,
  },
  shortUrl: {
    type: Number,
    unique: true,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
