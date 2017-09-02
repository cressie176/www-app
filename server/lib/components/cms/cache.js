import LRU from 'lru-cache';

export default function(options = {}) {

  function start({ config, logger, store, }, cb) {

    const cache = new LRU(config);

    function loadContent(tag, cb) {
      if (cache.has(tag)) return cb(null, cache.get(tag));

      store.loadContent(tag, (err, content) => {
        if (err) return cb(err);
        cache.set(tag, content);
        cb(null, content);
      });
    }

    function saveContent(tag, content, cb) {
      store.saveContent(tag, content, (err) => {
        if (err) return cb(err);
        cache.set(tag, content);
        cb();
      });
    }

    cb(null, { loadContent, saveContent, });
  }

  return {
    start: start,
  };
}
