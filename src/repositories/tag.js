const Tag = require("../models/tag");

class TagRepository {
  getTags(searchData) {
    return Tag.find(searchData).select({ __v: 0 });
  }
}

module.exports = TagRepository;
