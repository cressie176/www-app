import Boom from 'boom';
import cookieParser from 'cookie-parser';
import { v4 as uuid, } from 'uuid';

export default function(options = {}) {

  function start({ config, logger, app, }, cb) {

    app.use(cookieParser(), (req, res, next) => {
      if (isAccessor(req)) {
        if (!hasCsrfToken(req)) dropCsrfToken(res);
        next();
      } else if (checkCsrfToken(req)) {
        next();
      } else {
        next(Boom.forbidden());
      }
    });

    function isAccessor(req) {
      return ['GET', 'HEAD', 'OPTIONS',].indexOf(req.method) >= 0;
    }

    function hasCsrfToken(req) {
      return req.cookies['x-csrf-token'];
    }

    function checkCsrfToken(req) {
      const headerToken = req.headers['x-csrf-token'];
      const cookieToken = req.cookies['x-csrf-token'];
      return headerToken && cookieToken && headerToken === cookieToken;
    }

    function dropCsrfToken(res) {
      res.cookie('x-csrf-token', uuid(), { path: '/', secure: config.secure, });
    }

    cb();
  }

  return {
    start,
  };
}

