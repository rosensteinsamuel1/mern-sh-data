const axios = require("axios");
const mongoose = require("mongoose");

const Event = require("../models/eventModel");
const Venue = require("../models/venueModel");

module.exports.getEventsForVenue = (accessToken, venueId, callback) => {
  axios({
    method: "get",
    url: "https://api.stubhub.com//sellers/search/events/v3?venueId=".concat(
      venueId.toString(),
      "&rows=100&sort=eventDateLocal%20asc"
    ),
    headers: {
      Authorization: "Bearer ".concat(accessToken),
      Accept: "application/json"
    }
  }).then(result => {
    mongoose
      .connect(
        "mongodb+srv://sam2:IjCTbf2pc9dYPDHc@sh-price-data-huw4p.mongodb.net/sh-data?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("Connected to database!");
        console.log(result.data.events[0]);
        const events = [result.data.events[0]];
        events.forEach(event => {
          // Update venue database
          const venueId = event.venue.id;
          console.log(event);
          // Check if the venue exists
          saveVenue(venueId).then(() => {
            // Update event database
            Event.exists({ _id: event.id }).then(exists => {
              const newTicketInfoData = [
                {
                  date: Date.now(),
                  ticketInfo: event.ticketInfo
                }
              ];
              if (exists) {
                // add ticket data snapshot to existing event
                Event.findByIdAndUpdate(event.id, {
                  $push: { ticketInfoData: newTicketInfoData }
                });
              } else {
                const newEvent = new Event({
                  artistId: event.performers[0].id,
                  artistName: event.performers[0].name,
                  _id: event.id,
                  eventDate: event.eventDateLocal,
                  venue: event.venue,
                  ticketInfoData: newTicketInfoData
                });

                newEvent.save();
              }
            });
          });
        });
      })
      .catch(() => {
        console.log("Connection failed!");
      });

    callback(result.data);
  });
};

function saveVenue(venueId) {
  Venue.exists({ _id: venueId }).then(exists => {
    if (exists) {
      // add eventId to venue events only if it's not already present

      Venue.findByIdAndUpdate(venueId, {
        $addToSet: { events: event.id }
      }).then(result => {
        console.log(result.events.length);
      });
    } else {
      const newVenue = new Venue({
        _id: venueId,
        venueCity: event.venue.city,
        venueName: event.venue.name,
        events: [
          {
            artistId: event.performers[0].id,
            artistName: event.performers[0].name,
            events: event.id
          }
        ]
      });
      newVenue.save();
    }
  });
}
