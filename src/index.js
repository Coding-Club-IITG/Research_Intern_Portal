const express = require("express");
const bodyParser = require("body-parser");
const BaseError = require("./errors/BaseErrors.js");
const { PORT } = require("./config/server_config");
const errorHandler = require("./utils/errorHandler.js");
const connectToDb = require("./config/db_config.js");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.get("/ping", (req, res) => {
  return res.json({ message: "server is alive" });
});

//last middleware if any error comes
app.use(errorHandler);
app.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}`);
});
