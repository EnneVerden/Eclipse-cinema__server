const router = require("express").Router();
const UserController = require("../controllers/user");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const errorCatcher = require("../middleware/error-cather");
const validator = require("../middleware/validator");
const validationSchema = require("../validation_schemas");
const uploader = require("../middleware/uploader");
const resizer = require("../middleware/resizer");
const cloudinary = require("../middleware/cloudinary");

const User = new UserController();

router.use(isAuth);

router.get("/", isAdmin, errorCatcher(User.getUsers));
router.get("/orders", isAdmin, errorCatcher(User.getUsersMovies));
router.patch(
  "/",
  uploader("avatar"),
  cloudinary("avatars"),
  validator({ body: validationSchema.updateUser }),
  errorCatcher(User.updateUser)
);
router.patch("/replenish", errorCatcher(User.replenishBalance));
router.delete("/", errorCatcher(User.sendRemoveRequest));
router.delete("/all", isAdmin, errorCatcher(User.removeUsers));
router.delete("/:id", isAdmin, errorCatcher(User.removeUser));

module.exports = router;
