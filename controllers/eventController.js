const axios = require("axios");
const mongoose = require("mongoose");

const Event = require("../models/eventModel");

module.exports.generateTicketData = accessToken => {
  console.log("generateTicketData");
  const eventId = 104610090; // https://www.stubhub.com/doja-cat-tickets-doja-cat-brooklyn-brooklyn-steel-4-1-2020/event/104610090/
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
      console.log(response.data.events[0].ticketInfo);

      mongoose
        .connect(
          "mongodb+srv://manu:KyOP1JrHoErqQILt@cluster0-g8eu9.mongodb.net/products_test?retryWrites=true&w=majority"
        )
        .then(() => {
          console.log("Connected to database!");
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
