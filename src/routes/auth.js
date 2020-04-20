const router = require("express").Router();
const AuthController = require("../controllers/auth");
const passport = require("passport");
const errorCatcher = require("../middleware/error-cather");
const validator = require("../middleware/validator");
const validationSchema = require("../validation_schemas");

const Auth = new AuthController();

router.post(
  "/registration",
  validator({ body: validationSchema.registration }),
  errorCatcher(Auth.registration)
);
router.post(
  "/login",
  validator({ body: validationSchema.login }),
  passport.authenticate("local"),
  errorCatcher(Auth.login)
);
router.get("/logout", errorCatcher(Auth.logout));

module.exports = router;
