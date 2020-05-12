const session = require("express-session");
const passport = require("../main/passport");

module.exports = (expressApp) => {
  expressApp
    .use(
      session({
        secret: "ECLIPSE",
        resave: true,
        saveUninitialized: false,
        cookie: {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          sameSite: "none",
          httpOnly: true,
          secure: false,
        },
      })
    )
    .use(passport.initialize())
    .use(passport.session());
};
