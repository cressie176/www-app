import get from 'lodash.get';
import async from 'async';

export default function(options = {}) {

  function start({ config, logger, store, }, cb) {

    function getSite(tag, cb) {
      store.loadContent(tag, (err, content) => {
        if (err) return cb(err);
        cb(null, content.site);
      });
    }

    function getPage(tag, pageId, cb) {
      store.loadContent(tag, (err, content) => {
        if (err) return cb(err);
        cb(null, get(content, `pages.${pageId}`));
      });
    }

    function getProject(tag, projectId, cb) {
      store.loadContent(tag, (err, content) => {
        if (err) return cb(err);
        cb(null, get(content, `projects.${projectId}`));
      });
    }

    function listArticles(tag, cb) {
      store.loadContent(tag, (err, content) => {
        if (err) return cb(err);
        if (!content.articles) return cb(null, undefined);
        const articles = Object.keys(content.articles).reduce((memo, id) => {
          return Object.assign(memo, { [id]: toArticle(content.articles[id]), });
        }, {});
        cb(null, articles);
      });
    }

    function getArticle(tag, articleId, cb) {
      store.loadContent(tag, (err, content) => {
        if (err) return cb(err);
        const raw = get(content, `articles.${articleId}`);
        cb(null, toArticle(raw));
      });
    }

    function toArticle(raw) {
      return raw ? Object.assign({}, raw, { date: new Date(raw.date), }) : raw;
    }

    async.waterfall([
      store.loadReference.bind(store),
      (reference, cb) => cb(null, reference ? reference.tag : undefined),
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
