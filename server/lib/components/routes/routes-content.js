import bodyParser from 'body-parser';
import Boom from 'boom';

module.exports = function(options = {}) {

  function start({ config, app, cms, }, cb) {

    app.use(bodyParser.json());

    app.get('/api/content/1.0/pages/:id', (req, res, next) => {
      cms.getPage(req.params.id, (err, page) => {
        if (err) return next(err);
        if (!page) return next(Boom.notFound());
        res.json(page);
      });
    });

    app.get('/api/content/1.0/articles', (req, res, next) => {
      const channel = req.query.channel;
      cms.listArticles(channel, (err, articles) => {
        if (err) return next(err);
        res.json({
          total: articles.total,
          items: articles.items.sort(byDateAndId),
        });
      });
    });

    app.get('/api/content/1.0/articles/:id', (req, res, next) => {
      cms.getArticle(parseInt(req.params.id, 10), (err, article) => {
        if (err) return next(err);
        if (!article) return next(Boom.notFound());
        res.json(article);
      });
    });

    cb();
  }

  function byDateAndId(a, b) {
    return b.date.getTime() - a.date.getTime() || b.id - a.id;
  }

  return {
    start,
  };
};
