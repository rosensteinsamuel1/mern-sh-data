const axios = require("axios");
const CONSUMER_KEY = "7WdrXHAGyrq6RBHSGtzPN8kwAAYpICeG";
const CONSUMER_SECRET = "bSeGLodTmfx7HN5y";

const eventDataController = require("./controllers/eventController");

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
    username: "rosenstein.samuel1@gmail.com",
    password: "Peanuts10!"
  }
})
  .then(response => {
    const accessToken = response.data.access_token;
    console.log(accessToken);
    eventDataController.generateTicketData(accessToken);
  })
  .catch(err => {
    console.log("accessToken cannot be generated");
  });

// "username": "www.stubhub.com account email",
// "password": "www.stubhub.com account password"
