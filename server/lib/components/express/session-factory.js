export default function() {

  function start(dependencies, cb) {
    require(`./session-${dependencies.config.store}`)().start(dependencies, cb);
  }

  return {
    start,
  };
}
