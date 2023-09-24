const router = require("express").Router()

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/signup", (req, res) => {
    res.json({message: "Signup JSON"})
})

router.post("/login", (req, res) => {
    res.json({message: "Login Json"})
})

module.exports = router