const router = require("express").Router();
const AuthController = require("../controllers/auth");
const passport = require("passport");
const errorCatcher = require("../middleware/error-cather");

const Auth = new AuthController();

router.post("/registration", errorCatcher(Auth.registration));
router.post("/login", passport.authenticate("local"), errorCatcher(Auth.login));
router.get("/logout", errorCatcher(Auth.logout));

module.exports = router;
