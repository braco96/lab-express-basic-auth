// Middleware para proteger rutas que requieren autenticación
module.exports = {
  isLoggedIn: (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect("/login");
    }
    next();
  }
};
