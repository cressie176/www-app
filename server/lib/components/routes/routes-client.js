import path from 'path';
import express from 'systemic-express/express';

module.exports = function() {

  function start({ app, config, logger, }, cb) {

    app.use(express.static('./client/build'));

    app.get('*', (req, res)  => {
      res.sendFile(path.join(process.cwd(), 'client', 'build', 'index.html'));
    });

    cb();
  }

  return {
    start,
  };
};
