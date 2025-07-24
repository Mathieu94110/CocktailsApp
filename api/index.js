const express = require("express");
const cookie = require("cookie-parser");
const morgan = require("morgan");

const app = express();
require('dotenv').config();
const routes = require("./routes");
app.use(express.static(`${__dirname}/../client/build`));
app.use(morgan("tiny"));
app.use(cookie());
app.use(express.json());

require("./database");

app.use(routes);

app.use("*", (req, res) => {
  res.status(404).json("mauvaise routes");
});

app.listen(8086);
