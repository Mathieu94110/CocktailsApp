const mongoose = require("mongoose");

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const uri = process.env.MONGODB_URI;

mongoose
  .set("strictQuery", true)
  .connect(
    `mongodb+srv://${user}:${password}@${uri}/?retryWrites=true&w=majority&appName=Cluster0`
    , { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Base de données connectée"))
  .catch((err) => console.error("Erreur de connexion à la base de données", err));
