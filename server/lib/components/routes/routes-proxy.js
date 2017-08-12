import path from 'path';
import express from 'systemic-express/express';
import proxy from 'http-proxy-middleware';

module.exports = function() {

  function start({ app, config, logger, }, cb) {

    app.use(app.locals.hasRole('guest'), express.static('./client/build'));

    Object.keys(config.routes).forEach(key => {
      app.use(key, proxy({ target: config.routes[key], logProvider: () => logger, changeOrigin: true, }));
    });

    app.get('*', app.locals.hasRole('guest'), (req, res)  => {
      res.sendFile(path.join(process.cwd(), 'client', 'build', 'index.html'));
    });

    cb();
  }

  return {
    start,
  };
};
