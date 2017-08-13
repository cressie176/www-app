import path from 'path';
import express from 'systemic-express/express';

module.exports = function() {

  function start({ app, config, logger, }, cb) {

    // Lock down staging so Google can't accidentally index it
    app.use(app.locals.hasRole('guest'), express.static('./client/build'));

    // Ensures 404's are handled by the app
    app.get('*', app.locals.hasRole('guest'), (req, res)  => {
      res.sendFile(path.join(process.cwd(), 'client', 'build', 'index.html'));
    });

    cb();
  }

  return {
    start,
  };
};
