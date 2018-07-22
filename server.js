"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public" });
});

app.get('/user', (req, res) => {
  res.sendFile("user.html", { root: "./public"})
})

app.listen(PORT, function() {
  console.log(`You are running on PORT ${PORT}`);
});