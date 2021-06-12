require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dns = require("dns");
const url = require("url");
const mongoose = require("mongoose");

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
  let myURL;

  try {
    myURL = new URL(url);
  } catch {
    return res.json({ error: "invalid url" });
  }

  const { protocol, hostname, origin } = myURL;
  console.log("url:", url);
  // console.log('myURL:', myURL)
  // console.log('protocol:', protocol)

  if (protocol !== "http:" && protocol !== "https:") {
    return res.json({ error: "invalid url" });
  }

  // dns.lookup(origin, (err, address, family) => {
  //   if (err) return res.json({ error: 'invalid url' });
  // })

  Address.findOne({ originalUrl: url }, (err, data) => {
    console.log("i am here");
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Data:", data);
    }
  });

  return res.json({ greeting: "hello API" });
});

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  err => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port, function () {
        console.log(`Listening on port ${port}`);
      });
    }
  }
);
