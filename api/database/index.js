const mongoose = require("mongoose");

mongoose
  .set("strictQuery", true)
  .connect(
    "mongodb+srv://me94110:me94110@cluster0.mtuknxk.mongodb.net/cocktailsTest?retryWrites=true&w=majority"
  )

  .then(() => {
    console.log("CONNEXION DB OK !");
  })
  .catch((e) => {
    console.log("CONNEXION KO !", e);
  });
