const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

// GET signup: formulario de registro
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

// POST signup: crea el usuario con password cifrada
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render("auth/signup", {
      errorMessage: "Please provide both username and password"
    });
  }
  try {
    const found = await User.findOne({ username });
    if (found) {
      return res.render("auth/signup", {
        errorMessage: "Username is already in use"
      });
    }
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashed });
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("auth/signup", { errorMessage: "Error creating user" });
  }
});

// GET login: formulario de acceso
router.get("/login", (req, res) => {
  res.render("auth/login");
});

// POST login: valida credenciales y guarda usuario en sesión
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render("auth/login", {
      errorMessage: "Please provide both username and password"
    });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.render("auth/login", {
        errorMessage: "No user with that username"
      });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.render("auth/login", {
        errorMessage: "Incorrect password"
      });
    }
    req.session.currentUser = { _id: user._id, username: user.username };
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("auth/login", { errorMessage: "Error logging in" });
  }
});

// GET logout: destruye sesión
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
