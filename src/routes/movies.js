const router = require("express").Router();
const MovieController = require("../controllers/movie");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");
const errorCatcher = require("../middleware/error-cather");

const Movie = new MovieController();

router.use(isAuth);

router.get("/", errorCatcher(Movie.getMovies));
router.post("/", isAdmin, errorCatcher(Movie.createMovie));
router.delete("/:id", isAdmin, errorCatcher(Movie.removeMovie));

module.exports = router;
