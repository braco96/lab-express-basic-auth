const { Schema, model } = require("mongoose");

// Esquema básico de usuario con username único y password cifrada
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    // Almacenaremos el hash (bcrypt) de la contraseña
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
