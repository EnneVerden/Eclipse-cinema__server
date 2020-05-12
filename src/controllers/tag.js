const TagService = require("../services/tag");
const toJSON = require("../methods/toJSON");

const Tag = new TagService();

class TagController {
  async getTags(req, res) {
    const tags = await Tag.getTags();

    res.status(201).send(toJSON({ tags }));
  }
}

module.exports = TagController;
