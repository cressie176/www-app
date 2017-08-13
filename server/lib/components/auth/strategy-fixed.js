import { Strategy as CustomStrategy, } from 'passport-custom';

/********************************************************************************************
 Using 'module.exports' to workaround TypeError require is not a function
 See https://stackoverflow.com/questions/33007878/nodejs-typeerror-require-is-not-a-function
 ********************************************************************************************/
module.exports = function() {

  function start({ config, logger, app, session, passport, }, cb) {

    logger.info('Using fixed authentication strategy');

    app.use(session);
    app.use(passport.initialize());
    app.use(passport.session());

    const strategy = new CustomStrategy((req, cb) => {
      const user = config.fixed.user;
      return cb(null, user);
    });

    strategy.name = 'fixed';

    passport.use(strategy);

    app.get('/auth/fixed', passport.authenticate('fixed'), (req, res) => {
      res.locals.logger.info(`Authenticated ${req.user.id} using fixed strategy`);
      res.redirect(req.session.returnTo);
    });

    app.locals.loginUrl = '/auth/fixed';

    cb();
  }

  return {
    start,
  };
};
