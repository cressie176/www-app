import get from 'lodash.get';
import async from 'async';

export default function(options = {}) {

  function start({ config, logger, store, }, cb) {

    function getSite(tagId, cb) {
      store.loadContent(tagId, (err, content) => {
        if (err) return cb(err);
        cb(null, content.site);
      });
    }

    function getPage(tagId, pageId, cb) {
      store.loadContent(tagId, (err, content) => {
        if (err) return cb(err);
        cb(null, get(content, `pages.${pageId}`));
      });
    }

    function getProject(tagId, projectId, cb) {
      store.loadContent(tagId, (err, content) => {
        if (err) return cb(err);
        cb(null, get(content, `projects.${projectId}`));
      });
    }

    function listArticles(tagId, cb) {
      store.loadContent(tagId, (err, content) => {
        if (err) return cb(err);
        if (!content.articles) return cb(null, undefined);
        const articles = Object.keys(content.articles).reduce((memo, id) => {
          return Object.assign(memo, { [id]: toArticle(content.articles[id]), });
        }, {});
        cb(null, articles);
      });
    }

    function getArticle(tagId, articleId, cb) {
      store.loadContent(tagId, (err, content) => {
        if (err) return cb(err);
        const raw = get(content, `articles.${articleId}`);
        cb(null, toArticle(raw));
      });
    }

    function toArticle(raw) {
      return raw ? Object.assign({}, raw, { date: new Date(raw.date), }) : raw;
    }

    async.waterfall([
      store.loadTag.bind(store),
      store.loadContent.bind(store),
    ], ((err, content) => {
      if (err) logger.warn('Error pre-loading content', err);
      cb(null, {
        getSite,
        getPage,
        getProject,
        listArticles,
        getArticle,
      });
    }));
  }

  return {
    start: start,
  };
}
