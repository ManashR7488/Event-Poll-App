const express = require("express");
const Poll = require("../models/Poll");
const User =  require("../models/User");
const router = express.Router();

module.exports = (io) => {

  router.get("/", async (req, res) => {
    try {
      const polls = await Poll.find();
      res.json(polls);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  // Create a poll
  router.post("/create", async (req, res) => {
    const { eventName, dates, createdBy } = req.body;
    try {
      const poll = new Poll({ eventName, dates: dates.map(date => ({ date })), createdBy: createdBy.id});
      await poll.save();
      io.emit("pollCreated", poll); // Notify clients
      res.status(201).json(poll);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vote for a date
  router.post("/vote/:pollId", async (req, res) => {
    const { pollId } = req.params;
    const { date, voterName } = req.body;
  
    try {
      let poll = await Poll.findById(pollId);
      if (!poll) return res.status(404).json({ message: "Poll not found" });
  
      const dateToUpdate = poll.dates.find(d => d.date === date);
      if (!dateToUpdate) return res.status(404).json({ message: "Date not found" });
  
      if (dateToUpdate.votes.includes(voterName)) {
        return res.status(400).json({ message: "You have already voted for this date" });
      }

      dateToUpdate.votes.push(voterName);

      await poll.save();
      io.emit("pollUpdated", poll);
      res.json(poll);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Finalize a Date
  router.post("/finalize/:pollId", async (req, res) => {
    const { pollId } = req.params;
    const { phoneNumber } = req.body;

    try {
      const poll = await Poll.findById(pollId).populate("createdBy");
      if (!poll) return res.status(404).json({ message: "Poll not found" });

      // Find the date with the most votes
      const finalizedDate = poll.dates.reduce((max, date) => date.votes.length > max.votes.length ? date : max, poll.dates[0]).date;

      poll.finalizedDate = finalizedDate;
      await poll.save();
      io.emit("pollFinalized", poll);


      res.json({ message: "Finalized & WhatsApp notification sent!", finalizedDate });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
