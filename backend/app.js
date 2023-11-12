const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admins");
const productRoutes = require("./routes/products");
const CategoryRoutes = require("./routes/categories");

const app = express();

mongoose
  .connect(
    "mongodb+srv://siraj--ansari:qVZnOduTleooNJ9N@cluster0.dmaaxgf.mongodb.net/?retryWrites=true&w=majority",
    // {
    //   reconnectTries: 5, // Never stop trying to reconnect
    //   reconnectInterval: 500, // Reconnect every 500ms
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // }
  )
  .then(() => console.log("Successfully connected to mongoDB"))
  .catch((err) => console.log("error: ", err));

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "ecommerce-admin-portal")));

app.use("/productImages", express.static(path.join("backend/productImages")));
app.use("/api/auth", authRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", CategoryRoutes);
app.use((req, res, next) => {

  res.sendFile(path.join(__dirname, "ecommerce-admin-portal", "index.html"))
});

module.exports = app;
