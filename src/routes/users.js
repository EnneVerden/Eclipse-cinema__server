const router = require("express").Router();
const UserController = require("../controllers/user");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const errorCatcher = require("../middleware/error-cather");

const User = new UserController();

router.use(isAuth);

router.get("/", isAdmin, errorCatcher(User.getUsers));
router.delete("/all", isAdmin, errorCatcher(User.removeUsers));

module.exports = router;
