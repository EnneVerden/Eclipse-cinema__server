const router = require("express").Router();
const MovieController = require("../controllers/movie");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const errorCatcher = require("../middleware/error-cather");
const validator = require("../middleware/validator");
const validationSchema = require("../validation_schemas");
const uploader = require("../middleware/uploader");
const resizer = require("../middleware/resizer");
const cloudinary = require("../middleware/cloudinary");

const Movie = new MovieController();

router.get(
  "/",
  validator({ query: validationSchema.getMovies }),
  errorCatcher(Movie.getMovies)
);
router.post(
  "/",
  isAuth,
  isAdmin,
  uploader("poster"),
  cloudinary("posters"),
  validator({ body: validationSchema.addMovies }),
  errorCatcher(Movie.createMovie)
);
router.patch(
  "/:id",
  isAuth,
  isAdmin,
  uploader("poster"),
  cloudinary("posters"),
  validator({ body: validationSchema.updateMovie }),
  errorCatcher(Movie.updateMovie)
);
router.delete(
  "/:id",
  isAuth,
  isAdmin,
  validator({ params: validationSchema.id }),
  errorCatcher(Movie.removeMovie)
);

module.exports = router;
