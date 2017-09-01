export default function(options = {}) {

  function start({ pkg, app, prepper, contentful, store, }, cb) {
    app.get('/__/status', prepper.disable, (req, res) => {
      res.json({ name: pkg.name, version: pkg.version, description: pkg.description, });
    });

    // Used to test authentication
    app.get('/__/private', app.locals.hasRole('private'), (req, res) => res.status(204).send());
    app.get('/__/forbidden', app.locals.hasRole('forbidden'), (req, res) => res.status(204).send());

    app.post('/__/cms/:tag', app.locals.hasRole('publisher'), (req, res, err) => {
      contentful.extract(err, content) => {
        if (err) return next(err);
        store.saveContent(req.params.tag, content, cb(err) => {
          if (err) return next(err);
          res.send(204);
        });
      })
    })

    cb();
  }

  return {
    start,
  };
}
