import fs from 'fs';
import path from 'path';
import parseJson from 'safe-json-parse/callback';

export default function(options = {}) {

  function start({ config, logger, }, cb) {

    function getContentPath(tagId) {
      return path.resolve(config.content.path, `${tagId}.json`);
    }

    function getTagPath() {
      return path.resolve(config.tag.path, `${config.tag.name}.json`);
    }

    function loadContent(tag, cb) {
      const tagId = tag.id || tag;
      const contentPath = getContentPath(tagId);
      logger.info(`Loading content from ${contentPath}`);
      fs.readFile(contentPath, { encoding: 'utf-8', }, (err, text) => {
        if (err) return cb(new Error(err.message)); // Boom chokes on transpiled subclassed errors
        parseJson(text, cb);
      });
    }

    function saveContent(tag, content, cb) {
      const tagId = tag.id || tag;
      const contentPath = getContentPath(tagId);
      logger.info(`Saving content to ${contentPath}`);
      fs.writeFile(contentPath, JSON.stringify(content, null, 2), { encoding: 'utf-8', }, (err) => {
        if (err) return cb(new Error(err.message)); // Boom chokes on transpiled subclassed errors
        cb();
      });
    }

    function loadTag(cb) {
      const tagPath = getTagPath();
      logger.info(`Loading tag from ${tagPath}`);
      fs.readFile(tagPath, { encoding: 'utf-8', }, (err, text) => {
        if (err) return cb(new Error(err.message)); // Boom chokes on transpiled subclassed errors
        parseJson(text, cb);
      });
    }

    function saveTag(tag, cb) {
      const tagPath = getTagPath();
      logger.info(`Saving tag to ${tagPath}`);
      fs.writeFile(tagPath, JSON.stringify(tag, null, 2), { encoding: 'utf-8', }, (err) => {
        if (err) return cb(new Error(err.message)); // Boom chokes on transpiled subclassed errors
        cb();
      });
    }

    cb(null, { loadContent, saveContent, loadTag, saveTag, });
  }

  return {
    start: start,
  };
}
