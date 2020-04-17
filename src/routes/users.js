const router = require("express").Router();
const UserController = require("../controllers/user");
const isAuth = require("../middleware/isAuth");
const errorCatcher = require("../middleware/error-cather");

const User = new UserController();

router.use(isAuth);

router.get("/", errorCatcher(User.getUsers));

module.exports = router;
