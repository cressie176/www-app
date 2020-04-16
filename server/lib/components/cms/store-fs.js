import fs from 'fs';
import path from 'path';
import parseJson from 'safe-json-parse/callback';
import async from 'async';

export default function(options = {}) {

  function start({ config, logger, }, cb) {

    function getContentPath(tag) {
      return path.resolve(config.content.path, `${tag}.json`);
    }

    function listTags(cb) {
      listJsonFiles(config.content.path, cb);
    }

    function loadContent(tag, cb) {
      const contentPath = getContentPath(tag);
      logger.info(`Loading content from ${contentPath}`);
      loadJsonFile(contentPath, cb);
    }

    function saveContent(tag, content, cb) {
      const contentPath = getContentPath(tag);
      logger.info(`Saving content to ${contentPath}`);
      saveJsonFile(contentPath, content, cb);
    }

    function deleteContent(tag, cb) {
      const contentPath = getContentPath(tag);
      logger.info(`Deleting content at ${contentPath}`);
      fs.unlink(contentPath, cb);
    }

    function getReferencePath(id) {
      return path.resolve(config.reference.path, `${id}.json`);
    }

    function listReferences(cb) {
      listJsonFiles(config.reference.path, (err, ids) => {
        if (err) return cb(err);
        async.reduce(ids, {}, toReferences, cb);
      });
    }

    function toReferences(references, id, cb) {
      loadJsonFile(getReferencePath(id), (err, reference) => {
        if (err) return cb(err);
        reference.active = id === config.reference.id;
        cb(null, Object.assign(references, { [id]: reference, }));
      });
    }

    function loadReference(id, cb) {
      const referencePath = getReferencePath(id);
      logger.info(`Loading reference to ${referencePath}`);
      loadJsonFile(referencePath, cb);
    }

    function saveReference(id, reference, cb) {
      const referencePath = getReferencePath(id);
      logger.info(`Saving reference to ${referencePath}`);
      saveJsonFile(referencePath, reference, cb);
    }

    function loadJsonFile(filePath, cb) {
      fs.readFile(filePath, { encoding: 'utf-8', }, (err, text) => {
        if (err) return cb(new Error(err.message)); // Boom chokes on transpiled subclassed errors
        parseJson(text, cb);
      });
    }

    function listJsonFiles(directory, cb) {
      fs.readdir(directory, (err, files) => {
        if (err) return cb(new Error(err.message)); // Boom chokes on transpiled subclassed errors
        cb(null, files.filter(file => /\.json$/.test(file)).map(file => path.basename(file, '.json')));
      });
    }

    function saveJsonFile(filePath, data, cb) {
      fs.writeFile(filePath, JSON.stringify(data, null, 2), { encoding: 'utf-8', }, (err) => {
        if (err) return cb(new Error(err.message)); // Boom chokes on transpiled subclassed errors
        cb();
      });
    }

    function nuke(cb) {
      async.each([config.content.path, config.reference.path,], (directory, cb) => {
        fs.readdir(directory, (err, files) => {
          if (err) return cb(err);
          async.each(files.filter(file => /\.json$/.test(file)), (file, cb) => {
            fs.unlink(path.join(directory, file), cb);
          }, cb);
        });
      }, cb);
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
