const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserService = require("../services/user");
const DeletedUserRepository = require("../repositories/deletedUser");
const AuthenticationError = require("../errors/authentication");

const User = new UserService();
const DeletedUser = new DeletedUserRepository();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await User.getUser({ email });

      if (user) {
        if (await user.checkPassword(password)) {
          return done(null, user);
        } else {
          return done(
            new AuthenticationError("Email or password is incorrect!")
          );
        }
      } else {
        const deletedUser = await DeletedUser.getDeletedUser({ email });

        if (deletedUser) {
          done(new AuthenticationError("This account is already deleted!"));
        }

        return done(new AuthenticationError("Email or password is incorrect!"));
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  const user = await User.getUser({ _id });

  done(null, user);
});

module.exports = passport;
