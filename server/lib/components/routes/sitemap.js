import fs from 'fs';
import hogan from 'hogan.js';
import cookieParser from 'cookie-parser';
import async from 'async';
import get from 'lodash.get';

module.exports = function() {

  function start({ config, logger, app, cms, store, }, cb) {

    fs.readFile(config.path, { encoding: 'utf-8', }, (err, source) => {
      if (err) return cb(err);

      const template = hogan.compile(source);

      app.use('/sitemap.xml', cookieParser(), (req, res, next) => {
        store.loadReference((err, reference) => {
          if (err) return next(err);
          res.locals.tag = req.cookies.tag || reference.tag;
          next();
        });
      });

      app.get('/sitemap.xml', app.locals.hasRole('guest'), (req, res, next) => {

        fetchDocuments(res.locals.tag, (err, documents) => {
          if (err) return next(err);
          async.reduce(documents, [], toSitemapUrls, (err, urls) => {
            if (err) return next(err);
            res.set('content-type' ,'application/xml; charset=utf-8');
            res.set('cache-control', 'public, max-age=86400, must-revalidate');
            res.send(template.render({ urls: urls.sort(byLocation), }));
          });
        });

        function toSitemapUrls(urls, document, cb) {
          const path = document.url || get(document, 'link.url');
          if (!path) return cb(null, urls);
          const loc = stripTrailingSlash(`https://${req.headers.host}${path}`);
          cb(null, urls.concat({ loc, }));
        }
      });

      function stripTrailingSlash(url) {
        return /.*\/$/.test(url) ? url.slice(0, -1) : url;
      }

      function fetchDocuments(tag, cb) {
        async.parallel({
          pages: cms.listPages.bind(cms, tag),
          articles: cms.listArticles.bind(cms, tag),
        }, (err, { pages, articles, }) => {
          if (err) return cb(err);
          cb(null, Object.assign({}, pages, articles));
        });
      }

      function byLocation(a, b) {
        return a.loc.localeCompare(b.loc);
      }

      cb();
    });
  }

  return {
    start,
  };
};
