import get from 'lodash.get';
import async from 'async';

export default function(options = {}) {

  function start({ config, logger, store, }, cb) {

    function getSite(tag, cb) {
      store.loadContent(tag, (err, content) => {
        if (err) return cb(err);
        cb(null, get(content, 'site'));
      });
    }

    function listPages(tag, cb) {
      store.loadContent(tag, (err, content) => {
        if (err) return cb(err);
        cb(null, get(content, 'pages'));
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
        cb(null, get(content, 'articles'));
      });
    }

    function getArticle(tag, articleId, cb) {
      store.loadContent(tag, (err, content) => {
        if (err) return cb(err);
        cb(null, get(content, `articles.${articleId}`));
      });
    }

    function loadReference(cb) {
      store.loadReference(cb);
    }

    function extractTag(reference, cb) {
      cb(null, reference ? reference.tag : undefined);
    }

    function loadContent(tag, cb) {
      store.loadContent(tag, cb);
    }

    const preLoadContent = async.seq(loadReference, extractTag, loadContent);

    preLoadContent(err => {
      if (err) logger.warn('Error pre-loading content', err);
      cb(null, { getSite, listPages, getPage, getProject, listArticles, getArticle, });
    });
  }

  return {
    start: start,
  };
}
