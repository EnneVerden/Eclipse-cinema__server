class AccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.name = "AccessDeniedError";
    this.status = 403;
  }
}

module.exports = AccessDeniedError;
