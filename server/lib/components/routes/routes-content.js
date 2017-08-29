import bodyParser from 'body-parser';
import Boom from 'boom';

module.exports = function(options = {}) {

  function start({ config, app, cms, }, cb) {

    app.use(bodyParser.json());

    app.use('/api/content/1.0', (req, res, next) => {
      res.set('cache-control', 'public, max-age=3600, must-revalidate');
      next();
    });

    app.get('/api/content/1.0/pages/:id', app.locals.hasRole('guest'), (req, res, next) => {
      cms.getPage(req.params.id, (err, page) => {
        if (err) return next(err);
        if (!page) return next(Boom.notFound());
        res.json(page);
      });
    });

    app.get('/api/content/1.0/projects/:id', app.locals.hasRole('guest'), (req, res, next) => {
      cms.getProject(req.params.id, (err, project) => {
        if (err) return next(err);
        if (!project) return next(Boom.notFound());
        res.json(project);
      });
    });

    app.get('/api/content/1.0/articles', app.locals.hasRole('guest'), (req, res, next) => {
      cms.listArticles((err, articles) => {
        if (err) return next(err);
        res.json(articles);
      });
    });

    app.get('/api/content/1.0/articles/:id', app.locals.hasRole('guest'), (req, res, next) => {
      cms.getArticle(parseInt(req.params.id, 10), (err, article) => {
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
