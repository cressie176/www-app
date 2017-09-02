import LRU from 'lru-cache';

export default function(options = {}) {

  function start({ config, logger, store, }, cb) {

    let tag;
    const cache = new LRU(config);

    function loadContent(tag, cb) {
      const tagId = tag.id || tag;
      if (cache.has(tagId)) return cb(null, cache.get(tagId));

      store.loadContent(tagId, (err, content) => {
        if (err) return cb(err);
        cache.set(tagId, content);
        cb(null, content);
      });
    }

    function saveContent(tag, content, cb) {
      const tagId = tag.id || tag;
      store.saveContent(tagId, content, err => {
        if (err) return cb(err);
        cache.set(tagId, content);
        cb();
      });
    }

    function loadTag(cb) {
      if (tag) return cb(null, tag);
      store.loadTag((err, _tag) => {
        if (err) return cb(err);
        tag = _tag;
        cb(null, tag);
      });
    }

    function saveTag(_tag, cb) {
      store.saveTag(_tag, err => {
        if (err) return cb(err);
        tag = _tag;
        cb();
      });
    }

    cb(null, { loadContent, saveContent, loadTag, saveTag, });
  }

  return {
    start: start,
  };
}
