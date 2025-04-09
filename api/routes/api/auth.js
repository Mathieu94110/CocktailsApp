const UserModel = require("../../database/models/user.model");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe sont requis" });
  }

  try {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({ message: "Mauvais email ou mot de passe" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mauvais email ou mot de passe" });
    }
    const token = jsonwebtoken.sign({}, key, {
      subject: user._id.toString(),
      expiresIn: 3600 * 24 * 30 * 6, // Expiration du token
      algorithm: "RS256",
    });
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

router.get("/current", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, keyPub);
      const currentUser = await UserModel.findById(decodedToken.sub)
        .select("-password -__v")
        .exec();
      if (currentUser) {
        return res.json(currentUser);
      } else {
        return res.json(null);
      }
    } catch (e) {
      console.error(e);
      return res.json(null);
    }
  } else {
    return res.json(null);
  }
});

router.delete("/", (req, res) => {
  res.clearCookie("token");
  res.end();
});

module.exports = router;
