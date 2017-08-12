export default function() {

  function start(dependencies, cb) {
    require(`./strategy-${dependencies.config.id}`)().start(dependencies, cb);
  }

  return {
    start,
  };
}
