import fs from 'fs';
import path from 'path';
import parseJson from 'safe-json-parse/callback';

export default function(options = {}) {

  function start({ config, logger, }, cb) {

    function getContentPath(tag) {
      return path.resolve(config.path, `${tag}.json`);
    }

    function loadContent(tag, cb) {
      const contentPath = getContentPath(tag);
      logger.info(`Loading content from ${contentPath}`);
      fs.readFile(contentPath, { encoding: 'utf-8', }, (err, text) => {
        if (err) return cb(new Error(err.message)); // Boom chokes on transpiled subclassed errors
        parseJson(text, cb);
      });
    }

    function saveContent(tag, content, cb) {
      const contentPath = getContentPath(tag);
      logger.info(`Saving content to ${contentPath}`);
      fs.writeFile(contentPath, JSON.stringify(content, null, 2), { encoding: 'utf-8', }, (err) => {
        if (err) return cb(new Error(err.message)); // Boom chokes on transpiled subclassed errors
        cb();
      });
    }

    cb(null, { loadContent, saveContent, });
  }

  return {
    start: start,
  };
};
