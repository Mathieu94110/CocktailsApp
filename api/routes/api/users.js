const UserModel = require("../../database/models/user.model");
const bcrypt = require("bcryptjs");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Tous les champs (nom, email, mot de passe) sont requis" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    return res.status(201).json(user);

  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

module.exports = router;