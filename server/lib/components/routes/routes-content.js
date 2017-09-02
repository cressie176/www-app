import bodyParser from 'body-parser';
import Boom from 'boom';
import cookieParser from 'cookie-parser';

module.exports = function(options = {}) {

  function start({ config, app, cms, store, }, cb) {

    app.use('/api/content/1.0', bodyParser.json());

    app.use('/api/content/1.0', cookieParser(), (req, res, next) => {
      store.loadTag((err, tag) => {
        if (err) return next(err);
        res.locals.tagId = req.cookies.tag || tag.id;
        next();
      });
    });

    app.use('/api/content/1.0', app.locals.hasRole('guest'), (req, res, next) => {
      res.set('cache-control', 'public, max-age=3600, must-revalidate');
      next();
    });

    app.get('/api/content/1.0/site', (req, res, next) => {
      cms.getSite(res.locals.tagId, (err, site) => {
        if (err) return next(err);
        if (!site) return next(Boom.notFound());
        res.json(site);
      });
    });

    app.get('/api/content/1.0/pages/:id', (req, res, next) => {
      cms.getPage(res.locals.tagId, req.params.id, (err, page) => {
        if (err) return next(err);
        if (!page) return next(Boom.notFound());
        res.json(page);
      });
    });

    app.get('/api/content/1.0/projects/:id', (req, res, next) => {
      cms.getProject(res.locals.tagId, req.params.id, (err, project) => {
        if (err) return next(err);
        if (!project) return next(Boom.notFound());
        res.json(project);
      });
    });

    app.get('/api/content/1.0/articles', (req, res, next) => {
      cms.listArticles(res.locals.tagId, (err, articles) => {
        if (err) return next(err);
        res.json(articles);
      });
    });

    app.get('/api/content/1.0/articles/:id', (req, res, next) => {
      cms.getArticle(res.locals.tagId, parseInt(req.params.id, 10), (err, article) => {
        if (err) return next(err);
        if (!article) return next(Boom.notFound());
        res.json(article);
      });
    });

    cb();
  }

  return {
    start,
  };
};
