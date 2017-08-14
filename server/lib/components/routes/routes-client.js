import path from 'path';
import express from 'systemic-express/express';

module.exports = function() {

  function start({ app, config, logger, prepper,}, cb) {

    /*************************************************************************************************************************
    1. Using auth on public pages so we can lock down staging and prevent Google accidentally indexing it
    2. Disable request logging (prepper) for static assets
    3. Serve react app (index.html) explicitly so we can log requests and set cache control headers
    **************************************************************************************************************************/

    app.get(['/', '/index.html',], app.locals.hasRole('guest'), sendIndex);
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
