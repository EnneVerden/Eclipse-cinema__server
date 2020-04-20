const Tag = require("../models/tag");

class TagRepository {
  getTag(searchData) {
    return Tag.findOne(searchData).select({ name: 0, __v: 0 });
  }
}

module.exports = TagRepository;
