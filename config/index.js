const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const hbs = require("hbs");

module.exports = (app) => {
  // Logs de peticiones
  app.use(logger("dev"));

  // Parseo de body (formularios)
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Cookies
  app.use(cookieParser());

  // Archivos estáticos
  app.use(express.static(path.join(__dirname, "..", "public")));

  // Vistas HBS
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "hbs");

  // Partials (opcional)
  const partialsPath = path.join(__dirname, "..", "views", "partials");
  hbs.registerPartials(partialsPath, (err) => {});
};
