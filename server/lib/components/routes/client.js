import path from 'path';
import express from 'systemic-express/express';

const OTHER_CLIENT_REQUESTS = /^(?!(?:\/api\/|\/__\/)).*/;

module.exports = function() {

  function start({ app, config, logger, prepper,}, cb) {

    const staticMiddleware = express.static('./client/build', { setHeaders: (res, path) => {
      res.set('cache-control', 'public, max-age=3600, must-revalidate');
    }, });

    // We use StatusCake for monitoring site availability. No need to log
    app.use((req, res, next) => {
      if (!req.headers['user-agent']) return next();
      if (!req.headers['user-agent'].includes('StatusCake')) return next();
      prepper.disable(req, res, next);
    });

    // Make runtime client config available to index.html via script tag (yuck!)
    app.get('/config.js', app.locals.hasRole('guest'), (req, res) => {
      res.set('content-type' ,'application/javascript; charset=utf-8');
      res.set('cache-control', 'public, max-age=3600, must-revalidate');
      res.send(`this.window.config = ${JSON.stringify(config.public)}`);
    });

    // Always serve the app from root
    app.get('/index.html', (req, res) => res.redirect(301, '/'));

    // Handle requests to the robots, humans and client app
    app.get([/^\/$/, '/robots.txt', '/humans.txt',], app.locals.hasRole('guest'), staticMiddleware);

    // Do not log non index requests to static content
    app.get(prepper.disable, app.locals.hasRole('guest'), staticMiddleware);

    // Attempt to serve other static resources
    app.get(OTHER_CLIENT_REQUESTS, app.locals.hasRole('guest'), staticMiddleware);

    // Ensures client 404's are handled by the app
    app.get(OTHER_CLIENT_REQUESTS, app.locals.hasRole('guest'), sendIndex);


    function sendIndex(req, res, next) {
      res.set('cache-control', 'public, max-age=3600, must-revalidate');
      res.sendFile(path.join(process.cwd(), 'client', 'build', 'index.html'));
    }

    cb();
  }

  return {
    start,
  };
};
