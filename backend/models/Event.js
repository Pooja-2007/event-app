const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    startTime: String,
    endTime: String,
    location: String,
    rsvps: [
        { user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, status: String }
    ]
});

module.exports = mongoose.model("Event", EventSchema);
