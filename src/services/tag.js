const TagRepository = require("../repositories/tag");

const Tag = new TagRepository();

class TagService {
  async getTags() {
    return await Tag.getTags();
  }
}

module.exports = TagService;
