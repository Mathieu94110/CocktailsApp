const mongoose = require('mongoose');

mongoose.set("strictQuery", true)
  .connect(
    'mongodb+srv://byby94110:byby94110@cluster0.byrbrs1.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('CONNEXION DB OK !');
  })
  .catch((e) => {
    console.log('CONNEXION KO !', e);
  });
