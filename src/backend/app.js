const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

const app = express();

mongoose
  .connect(
    "mongodb+srv://siraj--ansari:qVZnOduTleooNJ9N@cluster0.dmaaxgf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Successfully connected to mongoDB"))
  .catch((err) => console.log("error: ", err));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

module.exports = app;
