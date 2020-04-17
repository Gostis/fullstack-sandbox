const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config.json");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todos = require("./routes/todos");

app.use(cors());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3001;

app.get("/", (req, res) => res.send("Hello World1!"));

const dbConfig = config.mongoURI;

//Connecting to monogoDB
mongoose
  .connect(dbConfig, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api/todos", todos);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
