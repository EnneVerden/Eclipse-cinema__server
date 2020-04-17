class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.type = "AuthenticationError";
    this.status = 401;
  }
}

module.exports = AuthenticationError;
