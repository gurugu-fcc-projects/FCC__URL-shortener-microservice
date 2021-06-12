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

  const { protocol } = myURL;

  if (protocol !== "http:" && protocol !== "https:") {
    return res.json({ error: "invalid url" });
  }

  const docsCount = await Address.estimatedDocumentCount();

  let address = await Address.findOne({ originalUrl: url });

  if (!address) {
    address = new Address({ originalUrl: url, shortUrl: docsCount + 1 });
    await address.save();
  }

  res.json({ original_url: address.originalUrl, short_url: address.shortUrl });
});

app.get("/api/shorturl/:shorturl", async (req, res) => {
  const { shorturl } = req.params;

  const address = await Address.findOne({ shortUrl: shorturl });

  if (!address) {
    res.json({ error: "No short URL found for the given input" });
  }

  res.redirect(address.originalUrl);
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
