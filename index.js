const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/courses", (req, res) => {
  res.render("courses");
});

app.use(authRoutes);

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "biko",
  port: 5432,
})
  .connect()
  .then(() => {
    app.listen(3000, () => {
      console.log("http://localhost:3000");
    });
  });
