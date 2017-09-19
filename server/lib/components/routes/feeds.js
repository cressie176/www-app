import fs from 'fs';
import hogan from 'hogan.js';
import cookieParser from 'cookie-parser';
import async from 'async';
import get from 'lodash.get';

module.exports = function() {

  function start({ config, logger, app, cms, store, }, cb) {

    let templates = {};

    async.parallel({
      atom: compile.bind(null, config.atom.template),
      sitemap: compile.bind(null, config.sitemap.template),
    }, (err, results) => {
      if (err) return cb(err);
      templates = results;
      cb();
    });

    function compile(path, cb) {
      fs.readFile(path, { encoding: 'utf-8', }, (err, source) => {
        if (err) return cb(err);
        cb(null, hogan.compile(source));
      });
    }

    app.use(['/sitemap.xml', '/feeds/',], app.locals.hasRole('guest'));

    app.use(['/sitemap.xml', '/feeds/',], cookieParser(), (req, res, next) => {
      store.loadReference((err, reference) => {
        if (err) return next(err);
        res.locals.tag = req.cookies.tag || reference.tag;
        res.locals.baseUrl = getBaseUrl(req);
        next();
      });
    });

    app.get('/sitemap.xml', (req, res, next) => {

      fetchDocuments(res.locals.tag, (err, documents) => {
        if (err) return next(err);
        const urls = Object.keys(documents)
          .reduce(toSitemapUrls(documents, res.locals.baseUrl), [])
          .sort(byLocation);

        res.set('content-type' ,'application/xml; charset=utf-8');
        res.set('cache-control', 'public, max-age=3600, must-revalidate');
        res.send(templates.sitemap.render({ urls, }));
      });

    });

    app.get('/feeds/atom.xml', (req, res, next) => {

      async.parallel({
        site: cms.getSite.bind(cms, res.locals.tag),
        articles: cms.listArticles.bind(cms, res.locals.tag),
      }, (err, documents) => {
        if (err) return next(err);

        const site = { ...documents.site, url: res.locals.baseUrl, };
        const articles = Object.keys(documents.articles)
          .map(id => documents.articles[id])
          .filter(byChannel(req.query.channel))
          .sort(byDate);
        const feed = toFeed(site, articles);

        res.set('content-type' ,'application/atom+xml; charset=utf-8');
        res.set('cache-control', 'public, max-age=3600, must-revalidate');
        res.send(templates.atom.render(feed));
      });
    });

    function fetchDocuments(tag, cb) {
      async.parallel({
        pages: cms.listPages.bind(cms, tag),
        articles: cms.listArticles.bind(cms, tag),
      }, (err, { pages, articles, }) => {
        if (err) return cb(err);
        cb(null, Object.assign({}, pages, articles));
      });
    }

    function toSitemapUrls(documents, baseUrl) {
      return function(urls, id) {
        const document = documents[id];
        const path = document.url || get(document, 'link.url');
        return path ? urls.concat({ loc: stripTrailingSlash(`${baseUrl}${path}`), }) : urls;
      };
    }

    function toFeed(site, articles) {
      const feed = {
        ...site,
        links: [
          { rel: "self", type: "application/atom+xml", href: `${site.url}/feeds/atom.xml`, },
          { rel: "alternate", type: "text/html", href: site.url, },
        ],
        author: {
          name: site.copyright.owner,
        },
        rights: `© ${site.copyright.year} ${site.copyright.owner}. ${site.copyright.rights}`,
        updated: articles.length ? articles[0].date : '2017-09-01T00:00:00.000Z',
      };
      feed.entries = articles.map(toAtomEntry(site, feed));
      return feed;
    }

    function toAtomEntry(site, feed) {
      return function(article) {
        return {
          ...article,
          id: `${feed.id}:${article.channel.id}:${article.id}`,
          links: [
            { rel: 'alternate', type: 'text/html', href: `${site.url}${article.url}`, },
          ],
          author: {
            name: article.author.displayName,
          },
          category: {
            term: article.channel.id,
            label: article.channel.title,
          },
          published: article.date,
          updated: article.date,
          summary: article.summary,
          content: article.body,
        };
      };
    }

    function getBaseUrl(req) {
      return `${getProtocol(req.headers)}://${req.headers.host}`;
    }

    function getProtocol(headers) {
      return headers['upgrade-insecure-requests'] ? 'https' : 'http';
    }

    function stripTrailingSlash(url) {
      return /.*\/$/.test(url) ? url.slice(0, -1) : url;
    }

    function byLocation(a, b) {
      return a.loc.localeCompare(b.loc);
    }

    function byDate(a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    function byChannel(channel) {
      return article => {
        return article.channel.id === channel;
      };
    }
  }

  return {
    start,
  };
};
