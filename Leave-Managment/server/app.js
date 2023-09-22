require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./Database/Connection");
const bodyParser = require('body-parser');
const router = require("./Routes/Auth/AuthRoute");
const router1 = require("./Routes/Admin/AdminRoute")
const router2 = require("./Routes/User/UserRoute")
const PORT = 4002;

var options = {
  origin: "http://localhost:3000",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors(options));

// Routes
app.use(router);
app.use(router1);
app.use(router2);

app.listen(PORT, () => {
  console.log(`Server started at Port No: ${PORT}`);
});
