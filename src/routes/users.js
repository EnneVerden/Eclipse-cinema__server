const router = require("express").Router();
const UserController = require("../controllers/user");
const errorCatcher = require("../middleware/error-cather");

const User = new UserController();

router.get("/", errorCatcher(User.getUsers));

module.exports = router;
