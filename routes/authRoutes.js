const router = require("express").Router();
const {
  signUpUser,
  loginUser,
  logOutUser,
} = require("../controllers/authControllers");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", logOutUser);

router.post("/signup", signUpUser);

router.post("/login", loginUser);

module.exports = router;
