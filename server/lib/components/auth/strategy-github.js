import { Strategy as GitHubStrategy, } from 'passport-github';

/********************************************************************************************
 Using 'module.exports' to workaround TypeError require is not a function
 See https://stackoverflow.com/questions/33007878/nodejs-typeerror-require-is-not-a-function
 ********************************************************************************************/
module.exports = function() {

  function start({ config, logger, app, session, passport, }, cb) {

    logger.info('Using github authentication strategy');

    app.use(session);
    app.use(passport.initialize());
    app.use(passport.session());

    const strategy = new GitHubStrategy({
      clientID: config.github.client.id,
      clientSecret: config.github.client.secret,
      callbackURL: config.github.callbackUrl,
    }, (accessToken, refreshToken, profile, cb) => {
      const user = { id: profile.username, name: profile.displayName, };
      return cb(null, user);
    });

    passport.use(strategy);

    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/auth/github', }), (req, res) => {
      res.locals.logger.info(`Authenticated ${req.user.id} using github strategy`);
      res.redirect(req.session.returnTo);
    });

    app.locals.loginUrl = '/auth/github';

    cb();
  }

  return {
    start,
  };
};
