import bodyParser from 'body-parser';

module.exports = function(options = {}) {

  function start({ config, app, cms, }, cb) {

    app.use(bodyParser.json());

    app.get('/api/1.0/articles', (req, res, next) => {
      cms.listArticles((err, articles) => {
        if (err) return next(err);
        res.json({
          total: articles.total,
          items: articles.items.sort(byDateAndId),
        });
      });
    });

    app.get('/api/1.0/articles/:article', (req, res, next) => {
      const articleId = getArticleId(req.params.article);
      cms.getArticle(articleId, (err, article) => {
        if (err) return next(err);
        if (!article) return res.status(404).json({ message: 'Not found', }); // TODO replace with negative lookahead in routes-client.js
        if (article.slug !== req.params.article) return res.redirect(`/api/1.0/articles/${article.slug}`);
        res.json(article);
      });
    });

    cb();
  }

  function byDateAndId(a, b) {
    return b.date.getTime() - a.date.getTime() || b.id - a.id;
  }

  function getArticleId(slug) {
    const list = slug.split('-');
    return parseInt(list[list.length - 1], 10);
  }

  return {
    start,
  };
};
