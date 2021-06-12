require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dns = require("dns");
const url = require("url");

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.post("/api/shorturl", function (req, res) {
  const { url } = req.body;
  const myURL = new URL(url);
  const { protocol, hostname } = myURL;

  dns.lookup(hostname, (err, address, family) => {
    if (err) res.json({ error: "invalid url" });
  });

  if (protocol !== "http" || protocol !== "https") {
    res.json({ error: "invalid url" });
  }

  res.json({ greeting: "hello API" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
