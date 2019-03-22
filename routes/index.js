const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/route-guard");

// Home: muestra enlaces distintos según sesión
router.get("/", (req, res) => {
  res.render("index", { user: req.session.currentUser });
});

// Página protegida: /main
router.get("/main", isLoggedIn, (req, res) => {
  res.render("main", { user: req.session.currentUser });
});

// Página protegida: /private
router.get("/private", isLoggedIn, (req, res) => {
  res.render("private", { user: req.session.currentUser });
});

module.exports = router;
