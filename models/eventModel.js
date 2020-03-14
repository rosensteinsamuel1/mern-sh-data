const mongoose = require("mongoose");

// 8CHMBfPLBpAZMpCt

// Save shEvenId, eventDate, venue, {ticketInfo}
// dataPoints: [date: {numberOfTickets, minPrice}]
const eventSchema = new mongoose.Schema({
  artistName: { type: String, required: true },
  artists: { type: Array, required: true },
  _id: { type: Number, required: true },
  eventDate: { type: Date, required: true },
  venue: { type: Map, required: true },
  ticketInfo: { type: Map, required: true },
  dataPoints: { type: Array } //, required: true }
});

module.exports = mongoose.model("Event", eventSchema);
