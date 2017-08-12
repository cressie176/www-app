export default function(options = {}) {

  function start({ pkg, app, }, cb) {
    app.get('/__/status', (req, res) => res.json(pkg));
    cb();
  }

  return {
    start,
  };
}
