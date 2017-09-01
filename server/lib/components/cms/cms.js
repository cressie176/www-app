import get from 'lodash.get';

export default function(options = {}) {

  function start({ config, logger, store, tag, }, cb) {

    function getSite(tag, cb) {
      store.loadContent(tag, (err, content) => {
        if (err) return cb(err);
        cb(null, content.site);
      });
    }

    function getPage(tag, id, cb) {
      store.loadContent(tag, (err, content) => {
        if (err) return cb(err);
        cb(null, get(content, `pages.${id}`));
      });
    }

    function getProject(tag, id, cb) {
      store.loadContent(tag, (err, content) => {
        if (err) return cb(err);
        cb(null, get(content, `projects.${id}`));
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

    function getArticle(tag, id, cb) {
      store.loadContent(tag, (err, content) => {
        if (err) return cb(err);
        const raw = get(content, `articles.${id}`);
        cb(null, toArticle(raw));
      });
    }

    function toArticle(raw) {
      return raw ? Object.assign({}, raw, { date: new Date(raw.date), }) : raw;
    }

    store.loadContent(tag, (err, content) => {
      if (err) return cb(err);
      cb(null, {
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
}
