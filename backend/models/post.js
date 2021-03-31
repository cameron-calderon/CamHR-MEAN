const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  name: { type: String, required: true },
  grossPay: { type: Number, required: true },
  stateIncome: { type: Number, required: true },
  fedMarginalRate: { type: Number, required: true },
  deferallRate: { type: Number, required: true },
});

module.exports = mongoose.model("Post", postSchema);
