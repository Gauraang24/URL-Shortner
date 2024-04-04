const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDb } = require("./connect");
const URL = require("./models/urls");

const app = express();
const Port = 8080;

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timeStamp: Date.now() } } }
  );

  res.redirect(entry.redirectURL);
});

//MongoDb Connection
connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDb Connected")
);
//Server Start
app.listen(Port, () => console.log(`Server Started At Port:${Port}`));
