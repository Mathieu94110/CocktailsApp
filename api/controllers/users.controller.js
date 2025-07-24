const UserModel = require("../database/models/user.model");
const bcrypt = require("bcryptjs");
const {
  findUserPerId,
  findUserPerEmail,
} = require('../queries/users.queries');
const { v4: uuid } = require('uuid');
const moment = require('moment');
const emailFactory = require('../emails');

exports.signup = async (req, res) => {
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
};

exports.emailLinkVerification = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    const user = await findUserPerId(userId);
    if (user && token && token === user.emailToken) {
      user.emailVerified = true;
      await user.save();
      return res.redirect('/');
    } else {
      return res.status(400).json('Problem during email verification');
    }
  } catch (e) {
    next(e);
  }
};

exports.initResetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email) {
      const user = await findUserPerEmail(email);
      if (user) {
        user.passwordToken = uuid();
        user.passwordTokenExpiration = moment().add(2, 'hours').toDate();
        await user.save();
        emailFactory.sendResetPasswordLink({
          to: email,
          host: req.headers.host,
          userId: user._id,
          token: user.passwordToken,
        });
        return res.status(200).end();
      }
    }
    return res.status(400).json('Utilisateur inconnu');
  } catch (e) {
    next(e);
  }
};

exports.resetPasswordForm = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    const user = await findUserPerId(userId);
    if (user && user.passwordToken === token) {
      return res.render('auth/auth-reset-password', {
        url: `https://${req.headers.host}/users/reset-password/${user._id}/${user.passwordToken}`,
        errors: null,
        isAuthenticated: false,
      });
    } else {
      return res.status(400).json("L'utilisateur n'existe pas");
    }
  } catch (e) {
    next(e);
  }
};

exports.resetPassowrd = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    const { password } = req.body;
    const user = await findUserPerId(userId);
    if (
      password &&
      user &&
      user.passwordToken === token &&
      moment() < moment(user.passwordTokenExpiration)
    ) {
      user.password = await User.hashPassword(password);
      user.passwordToken = null;
      user.passwordTokenExpiration = null;
      await user.save();
      return res.redirect('/');
    } else {
      return res.render('auth/auth-reset-password', {
        url: `https://${req.headers.host}/users/reset-password/${user._id}/${user.passwordToken}`,
        errors: ["Une erreur c'est produite"],
        isAuthenticated: false,
      });
    }
  } catch (e) {
    next(e);
  }
};