const router = require("express").Router();
const MovieController = require("../controllers/movie");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const errorCatcher = require("../middleware/error-cather");
const validator = require("../middleware/validator");
const validationSchema = require("../validation_schemas");
const uploader = require("../middleware/uploader");
const resizer = require("../middleware/resizer");

const Movie = new MovieController();

router.use(isAuth);

router.get(
  "/",
  validator({ query: validationSchema.getMovies }),
  errorCatcher(Movie.getMovies)
);
router.post(
  "/",
  isAdmin,
  uploader("poster"),
  resizer("posters"),
  validator({ body: validationSchema.addMovies }),
  errorCatcher(Movie.createMovie)
);
router.patch(
  "/:id",
  isAdmin,
  uploader("poster"),
  resizer("posters"),
  validator({ body: validationSchema.updateMovie }),
  errorCatcher(Movie.updateMovie)
);
router.delete(
  "/:id",
  isAdmin,
  validator({ params: validationSchema.id }),
  errorCatcher(Movie.removeMovie)
);

module.exports = router;
