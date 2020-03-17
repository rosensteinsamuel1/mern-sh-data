const mongoose = require("mongoose");

// Save shEvenId, eventDate, venue, {ticketInfo}
// dataPoints: [date: {numberOfTickets, minPrice}]
const venueSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  venueCity: { type: String, required: true },
  venueName: { type: String, required: true },
  events: { type: Array, required: true }
});

module.exports = mongoose.model("Venue", venueSchema);
