class WrongDataError extends Error {
  constructor(message) {
    super(message);
    this.name = "WrongDataError";
    this.status = 400;
  }
}

module.exports = WrongDataError;
