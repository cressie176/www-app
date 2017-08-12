import { Strategy as CustomStrategy, } from 'passport-custom';

/********************************************************************************************
 Using 'module.exports' to workaround TypeError require is not a function
 See https://stackoverflow.com/questions/33007878/nodejs-typeerror-require-is-not-a-function
 ********************************************************************************************/
module.exports = function() {

  function start({ config, logger, app, passport, }, cb) {

    const strategy = new CustomStrategy((req, cb) => {
      const user = config.fixed.user;
      logger.info(`Authenticated ${user.id} using fixed strategy`);
      return cb(null, user);
    });

    strategy.name = 'fixed';

    passport.use(strategy);

    app.get('/auth/fixed', passport.authenticate('fixed'), (req, res) => {
      res.redirect(req.session.returnTo);
    });

    app.locals.loginUrl = '/auth/fixed';

    cb();
  }

  return {
    start,
  };
};
