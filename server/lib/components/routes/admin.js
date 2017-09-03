export default function(options = {}) {

  function start({ pkg, app, prepper, }, cb) {

    app.get('/__/status', prepper.disable, (req, res) => {
      res.json({ name: pkg.name, version: pkg.version, description: pkg.description, });
    });

    // Used to test authentication
    app.get('/__/private', app.locals.hasRole('private'), (req, res) => res.status(204).send());
    app.get('/__/forbidden', app.locals.hasRole('forbidden'), (req, res) => res.status(204).send());

    cb();
  }

  return {
    start,
  };
}
