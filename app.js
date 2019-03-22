// ℹ Carga variables de entorno
require("dotenv/config");

// ℹ️ Conecta a la base de datos
require("./db");

const express = require("express");
const hbs = require("hbs");
const path = require("path");

// Sesión y store en Mongo para mantener usuarios logueados
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

// Configuración base (parsers, estáticos, logger, motor de vistas)
require("./config")(app);

// --- Sesiones ---
// Guardamos la sesión en Mongo y configuramos la cookie HTTP-only
app.use(
  session({
    secret: process.env.SESS_SECRET || "super-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000 // 1h
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    })
  })
);

// Valor por defecto para el título
const projectName = "lab-express-basic-auth";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} - Ironhack`;

// Rutas de autenticación (signup, login, logout)
const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

// Rutas públicas / protegidas
const index = require("./routes/index");
app.use("/", index);

// Manejadores de error y 404
require("./error-handling")(app);

module.exports = app;
