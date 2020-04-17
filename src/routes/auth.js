const router = require("express").Router();
const AuthController = require("../controllers/auth");
const errorCatcher = require("../middleware/error-cather");

const Auth = new AuthController();

router.post("/registration", errorCatcher(Auth.registration));

module.exports = router;
