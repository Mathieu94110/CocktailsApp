const express = require("express");
const router = express.Router();
const { Favorite } = require("../../database/models/favorite.model");

router.post("/addToFavorites", (req, res) => {
  const favorite = new Favorite(req.body);
  favorite.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.delete("/removeFromFavorites", (req, res) => {
  Favorite.findOneAndDelete({
    idDrink: req.body.idDrink,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

router.get("/getFavoredCocktail/:userInfos", (req, res) => {
  //Need to find all of the Users that I am subscribing to From Subscriber Collection
  let { userInfos } = req.params;
  Favorite.find({ userFrom: userInfos }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorites });
  });
});
module.exports = router;
