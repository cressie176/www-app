import Boom from 'boom';

export default function() {

  function start({ config, app, }, cb) {

    function hasRole(role) {

      return function(req, res, next) {

        if (!config[role]) return next(Boom.internal());
        if (config[role].indexOf('*') >= 0) return next();

        if (!req.user) {
          req.session.returnTo = req.originalUrl || req.url;
          return res.redirect(req.app.locals.loginUrl);
        }

        if (config[role].indexOf(req.user.id) < 0) {
          res.locals.logger.info(`Denying user ${req.user.id} access to ${req.url}`);
          return next(Boom.forbidden());
        }

        res.locals.logger.info(`Granting user ${req.user.id} access to ${req.url}`);
        next();
      };
    }

    app.locals.hasRole = hasRole;

    cb();
  }

  return {
    start,
  };
}
