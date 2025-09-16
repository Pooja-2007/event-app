const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Event = require("./Event");

router.post("/", auth, async (req, res) => {
    const { eventId, status } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        const existing = event.rsvps.find(r => r.user.toString() === req.user.id);
        if (existing) existing.status = status;
        else event.rsvps.push({ user: req.user.id, status });

        await event.save();
        res.json({ message: "RSVP updated", event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
