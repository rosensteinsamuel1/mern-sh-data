const axios = require("axios");
const CONSUMER_KEY = "7WdrXHAGyrq6RBHSGtzPN8kwAAYpICeG";
const CONSUMER_SECRET = "bSeGLodTmfx7HN5y";

const shAPI = require("./shAPI");

const shCron = () => {
  var b = new Buffer.from(CONSUMER_KEY.concat(":", CONSUMER_SECRET));
  var encoded = b.toString("base64");
  console.log(encoded);
  const authHeader = "Basic ".concat(encoded);

  axios({
    method: "post",
    url:
      "https://api.stubhub.com/sellers/oauth/accesstoken?grant_type=client_credentials",
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
    data: {
      username: process.env.USERNAME,
      password: process.env.PWRD
    }
  })
    .then(response => {
      const accessToken = response.data.access_token;
      console.log(accessToken);
      // shAPI.saveTicketDataForEvent(accessToken, "104325142");
      // //   const eventId = 104610090;
      // //   shAPI.getTicketDataForEvent(accessToken, eventId);
      const venues = {
        "Brooklyn Steel": 448278,
        "The Sinclair": 213170,
        "Union Transfer": 195776,
        "9:30 Club": 2222
      };
      const venueIds = [
        venues["Brooklyn Steel"],
        venues["The Sinclair"],
        venues["Union Transfer"],
        venues["9:30 Club"]
      ];
      shAPI.getEventsForVenue(accessToken, 448278, result => {});
      // venueIds.forEach(venueId => {
      //   shAPI.getEventsForVenue(accessToken, venueId, result => {});
      // });
    })
    .catch(err => {
      console.log("accessToken cannot be generated");
    });
};

module.exports = shCron;
