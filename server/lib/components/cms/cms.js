import fs from 'fs';
import path from 'path';
import parseJson from 'safe-json-parse/callback';

module.exports = function(options = {}) {

  function start({ config, logger, tag, }, cb) {

    let content = {
      pages: {},
      articles: [],
    };

    function loadContent(tag, cb) {
      const contentPath = path.join(config.path, `${tag}.json`);
      logger.info(`Loading content from ${contentPath}`);
      fs.readFile(contentPath, { encoding: 'utf-8', }, (err, text) => {
        if (err) return cb(err);
        parseJson(text, (err, _content) => {
          if (err) return cb(err);
          content = _content;
          cb(null);
        });
      });
    }

    function getSite(cb) {
      return cb(null, content.site);
    }

    function getPage(id, cb) {
      return cb(null, content.pages[id]);
    }

    function getProject(id, cb) {
      return cb(null, content.projects[id]);
    }

    function listArticles(cb) {
      const articles = Object.keys(content.articles).reduce((memo, id) => {
        return Object.assign(memo, { [id]: toArticle(content.articles[id]), });
      }, {});
      return cb(null, articles);
    }

    function getArticle(id, cb) {
      const raw = content.articles[`${id}`];
      return cb(null, toArticle(raw));
    }

    function toArticle(raw) {
      return raw ? Object.assign({}, raw, { date: new Date(raw.date), }) : raw;
    }

    loadContent(tag, err => {
      if (err) return cb(err);
      cb(null, {
        loadContent,
        getSite,
        getPage,
        getProject,
        listArticles,
        getArticle,
      });
    });
  }

  return {
    start: start,
  };
};
