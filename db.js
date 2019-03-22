const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-express-basic-auth";

// Conexión a Mongo
mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`✅ Connected to Mongo! Database name: "${x.connection.name}"`)
  )
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));
