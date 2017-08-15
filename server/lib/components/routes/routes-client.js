import path from 'path';
import express from 'systemic-express/express';

module.exports = function() {

  function start({ app, config, logger, prepper,}, cb) {

    // Serve react app (index.html) explicitly, instead of via express.static
    // so we can log requests and set cache control headers
    app.get([/^\/$/, '/index.html',], app.locals.hasRole('guest'), sendIndex);

    // Make runtime client config available to index.html via script tag (yuck!)
    app.get('/config.js', app.locals.hasRole('guest'), (req, res) => {
      res.set('content-type' ,'application/javascript; charset=utf-8');
      res.set('cache-control' ,'public, max-age=3600, must-revalidate');
      res.send(`this.window.config = ${JSON.stringify(config.public)}`);
    });

    app.use(prepper.disable, app.locals.hasRole('guest'), express.static('./client/build', { cachecontrol: true, maxage: '1d', }));

    // Ensures 404's are handled by the app
    app.get('*', prepper.enable, app.locals.hasRole('guest'), sendIndex);

    function sendIndex(req, res) {
      res.sendFile(path.join(process.cwd(), 'client', 'build', 'index.html'));
    }

    cb();
  }

  return {
    start,
  };
};
