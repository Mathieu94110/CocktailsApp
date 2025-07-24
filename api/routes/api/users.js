const router = require("express").Router();
const {
  signup,
  emailLinkVerification,
  initResetPassword,
  resetPasswordForm,
  resetPassowrd
} = require("../../controllers/users.controller");


router.post("/signup", signup);
router.get("/email-verification/:userId/:token", emailLinkVerification);
router.post("/forgot-password", initResetPassword);
router.get("/reset-password/:userId/:token", resetPasswordForm);
router.post("/reset-password/:userId/:token", resetPassowrd);

module.exports = router;
