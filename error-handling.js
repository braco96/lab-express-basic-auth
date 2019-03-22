module.exports = (app) => {
  // 404
  app.use((req, res) => {
    res.status(404).render("not-found");
  });

  // Errores
  app.use((err, req, res, next) => {
    console.error("ERROR", req.method, req.path, err);
    if (!res.headersSent) {
      res.status(500).render("error", { error: err });
    }
  });
};
