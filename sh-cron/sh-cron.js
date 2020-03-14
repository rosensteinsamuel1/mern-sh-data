const axios = require("axios");
const mongoose = require("mongoose");

const Event = require("../models/eventModel");

module.exports.generateTicketDataForEvent = (accessToken, eventId) => {
  console.log("generateTicketData");
  //   const eventId = 104610090; // https://www.stubhub.com/doja-cat-tickets-doja-cat-brooklyn-brooklyn-steel-4-1-2020/event/104610090/
  axios({
    method: "get",
    url: "https://api.stubhub.com/sellers/search/events/v3/?id=".concat(
      eventId.toString()
    ),
    headers: {
      Authorization: "Bearer ".concat(accessToken),
      Accept: "application/json"
    }
  })
    .then(response => {
      console.log(response.data.events[0]);
      const eventData = response.data.events[0];

      mongoose
        .connect(
          "mongodb+srv://sam:S15u5Viw4GILT1oZ@sh-price-data-huw4p.mongodb.net/sh-data?retryWrites=true&w=majority"
        )
        .then(() => {
          console.log("Connected to database!");
          const createdEvent = new Event({
            artistName: eventData.name,
            artists: eventData.performers,
            _id: eventData.id,
            eventDate: eventData.eventDateLocal,
            venue: eventData.venue,
            ticketInfo: eventData.ticketInfo
            //dataPoints: { type: Array, required: true })}
          });

          createdEvent.save().then(result => {
            console.log(result, " was saved");
            mongoose.disconnect(() => {
              console.log("connect closed");
            });
          });
        })
        .catch(() => {
          console.log("Connection failed!");
        });

      // if this is a new event, create new event

      // else, add new dataPoint to the event
    })
    .catch(err => {
      console.log(
        "Unable to process API data for: ",
        eventId,
        "with err: ",
        err
      );
    });
};
