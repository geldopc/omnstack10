const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

mongoose.connect(
  "mongodb+srv://geldopc:geldopc10@cluster0-5g0ph.mongodb.net/bd-omnistack10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
app.use(express.json());
app.use(routes);

app.listen(3333);
