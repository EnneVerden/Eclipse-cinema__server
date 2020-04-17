const bcrypt = require("bcryptjs");

class Hash {
  async hash(data) {
    return await bcrypt.hash(data, 10);
  }

  async compare(reqData, hashData) {
    return await bcrypt.compare(reqData, hashData);
  }
}

module.exports = Hash;
