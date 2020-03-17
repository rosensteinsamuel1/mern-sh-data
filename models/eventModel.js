const mongoose = require("mongoose");

// 8CHMBfPLBpAZMpCt

// Save shEvenId, eventDate, venue, {ticketInfo}
// dataPoints: [date: {numberOfTickets, minPrice}]
const eventSchema = new mongoose.Schema({
  artistName: { type: String, required: true },
  artistId: { type: Number, required: true },
  _id: { type: Number, required: true },
  eventDate: { type: Date, required: true },
  venue: { type: Map, required: true },
  ticketInfoData: { type: Array, required: true }
});

module.exports = mongoose.model("Event", eventSchema);
