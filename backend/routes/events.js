const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Event = require("../models/Event");

// Get all events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Admin create event
router.post("/", auth, async (req, res) => {
    if (req.user.role !== "Admin") return res.status(403).json({ message: "Access denied" });
    try {
        const event = await Event.create(req.body);
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
