import Boom from 'boom';
import cookieParser from 'cookie-parser';
import { v4 as uuid, } from 'uuid';

export default function(options = {}) {

  function start({ config, logger, app, }, cb) {

    app.use(cookieParser(), (req, res, next) => {
      return ['GET', 'HEAD', 'OPTIONS',].indexOf(req.method) >= 0
        ? dropCsrfToken(req, res, next)
        : checkCsrfToken(req, res, next);
    });

    function dropCsrfToken(req, res, next) {
      res.cookie('x-csrf-token', uuid(), { path: '/', secure: config.secure, });
      next();
    }

    function checkCsrfToken(req, res, next) {
      const headerToken = req.headers['x-csrf-token'];
      const cookieToken = req.cookies['x-csrf-token'];
      if (!headerToken || !cookieToken || headerToken !== cookieToken) return next(Boom.forbidden());
      next();
    }

    cb();
  }

  return {
    start,
  };
}

