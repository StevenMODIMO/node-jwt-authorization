require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/requireAuth");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.get("*", checkUser);

app.get("/", requireAuth, (req, res) => {
  res.render("home");
});

app.get("/courses", requireAuth, (req, res) => {
  res.render("courses");
});

app.use(authRoutes);

app.get("/set-cookies", (req, res) => {
  res.cookie("newUser", false);
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.send(":Cookie Received");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
  });
});
