const router = require("express").Router();
const errorCatcher = require("../middleware/error-cather");
const TagController = require("../controllers/tag");

const Tag = new TagController();

router.get("/", errorCatcher(Tag.getTags));

module.exports = router;
