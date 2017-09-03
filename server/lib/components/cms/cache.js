import LRU from 'lru-cache';

export default function(options = {}) {

  function start({ config, logger, store, }, cb) {

    let reference;
    const cache = new LRU(config);

    function listTags(cb) {
      store.listTags(cb);
    }

    function loadContent(tag, cb) {
      if (cache.has(tag)) return cb(null, cache.get(tag));

      store.loadContent(tag, (err, content) => {
        if (err) return cb(err);
        cache.set(tag, content);
        cb(null, content);
      });
    }

    function saveContent(tag, content, cb) {
      store.saveContent(tag, content, err => {
        if (err) return cb(err);
        cache.set(tag, content);
        cb();
      });
    }

    function deleteContent(tag, cb) {
      store.deleteContent(tag, err => {
        if (err) return cb(err);
        cache.del(tag);
        cb();
      });
    }

    function listReferences(cb) {
      store.listReferences(cb);
    }

    function loadReference(cb) {
      if (reference) return cb(null, reference);
      store.loadReference((err, _reference) => {
        if (err) return cb(err);
        reference = _reference;
        cb(null, reference);
      });
    }

    function saveReference(_reference, cb) {
      store.saveReference(_reference, err => {
        if (err) return cb(err);
        reference = _reference;
        cb();
      });
    }

    cb(null, { listTags, loadContent, saveContent, deleteContent, listReferences, loadReference, saveReference, });
  }

  return {
    start: start,
  };
}
