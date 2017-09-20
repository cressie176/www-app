import path from 'path';
import express from 'systemic-express/express';

const CLIENT_REQUESTS = /^(?!(?:\/api\/|\/__\/)).*/;

module.exports = function() {

  function start({ app, config, logger, prepper,}, cb) {

    const staticMiddleware = express.static('./client/build', {
      setHeaders: (res, path) => {
        res.set('Cache-Control', 'public, max-age=3600, must-revalidate');
      },
    });

    // Disable logging for StatusCake
    app.use((req, res, next) => {
      if (!req.headers['user-agent']) return next();
      if (!req.headers['user-agent'].includes('StatusCake')) return next();
      prepper.disable(req, res, next);
    });

    // Make runtime client config available via script tag (yuck!)
    app.get('/config.js', app.locals.hasRole('guest'), (req, res) => {
      res.set('Content-Type' ,'application/javascript; charset=utf-8');
      res.set('Cache-Control', 'public, max-age=3600, must-revalidate');
      res.send(`this.window.config = ${JSON.stringify(config.public)}`);
    });

    // Always serve the app from root
    app.get('/index.html', (req, res) => res.redirect(301, '/'));

    // Handle requests to the robots.txt, humans.txt and the client app without disabling logging
    app.get([/^\/$/, '/robots.txt', '/humans.txt',], app.locals.hasRole('guest'), staticMiddleware);

    // Serve other static resources with logging disabled
    app.get(CLIENT_REQUESTS, prepper.disable, app.locals.hasRole('guest'), staticMiddleware);

    // Ensure client 404's are handled by the app
    app.get(CLIENT_REQUESTS, prepper.enable, app.locals.hasRole('guest'), (req, res, next) => {
      res.set('Cache-Control', 'public, max-age=3600, must-revalidate');
      res.status(404);
      res.sendFile(path.join(process.cwd(), 'client', 'build', 'index.html'));
    });

    cb();
  }

  return {
    start,
  };
};
