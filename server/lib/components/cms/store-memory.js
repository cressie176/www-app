export default function(options = {}) {

  function start({ config, }, cb) {

    const store = { data: {}, references: {}, };

    function listTags(cb) {
      setImmediate(() => {
        cb(null, Object.keys(store.data));
      });
    }

    function loadContent(tag, cb) {
      setImmediate(() => {
        cb(null, store.data[tag]);
      });
    }

    function saveContent(tag, content, cb) {
      setImmediate(() => {
        store.data[tag] = content;
        cb();
      });
    }

    function deleteContent(tag, cb) {
      setImmediate(() => {
        if (!store.data[tag]) return cb(new Error(`Unknown tag ${tag}`));
        delete store.data[tag];
        cb();
      });
    }

    function listReferences(cb) {
      setImmediate(() => {
        store.references[config.reference.id].active = true;
        cb(null, store.references);
      });
    }

    function loadReference(id, cb) {
      setImmediate(() => {
        cb(null, store.references[id]);
      });
    }

    function saveReference(id, reference, cb) {
      setImmediate(() => {
        store.references[id] = reference;
        cb();
      });
    }

    function nuke(cb) {
      store.data = {};
      store.references = {};
      cb();
    }

    cb(null, {
      listTags,
      loadContent,
      saveContent,
      deleteContent,
      listReferences,
      loadReference: loadReference.bind(null, config.reference.id),
      saveReference: saveReference.bind(null, config.reference.id),
      nuke,
    });
  }

  return {
    start: start,
  };
}
