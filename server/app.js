const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const adminRoute = require("./routes/adminRoute");


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/beauty")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => console.log(err));


app.use("/api/admin", adminRoute);






app.listen(8000, () => {
  console.log("server run port 8000");
});