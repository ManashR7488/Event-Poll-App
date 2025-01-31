const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  eventName: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dates: [
    {
      date: String,
      votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  ],
  finalizedDate: { type: String, default: null },
});

module.exports = mongoose.model("Poll", pollSchema);
