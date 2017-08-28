import component from '../../lib/components/cms/cms';

describe('CMS', () => {

  const logger = {
    info: () => {},
    error: () => {},
  };

  const config = {
    path: `${__dirname}/data`,
  };


  it('should get list of articles', done => {

    expect.assertions(4);

    const tag = 'sample-1';

    component().start({ config, logger, tag, }, (err, cms) => {
      expect(err).toBe(null);
      cms.listArticles((err, articles) => {
        expect(err).toBe(null);
        expect(articles.items.length).toBe(4);
        expect(articles.total).toBe(4);
        done();
      });
    });
  });


  it('should convert raw article to decorated one', done => {

    expect.assertions(3);

    const tag = 'sample-1';

    component().start({ config, logger, tag, }, (err, cms) => {
      expect(err).toBe(null);
      cms.listArticles((err, articles) => {
        expect(err).toBe(null);
        expect(articles.items[0].date.getTime()).toBe(1483228800000);
        done();
      });
    });
  });


  it('should tolerate no articles', done => {
    expect.assertions(4);

    const tag = 'no-articles';

    component().start({ config, logger, tag, }, (err, cms) => {
      expect(err).toBe(null);
      cms.listArticles((err, articles) => {
        expect(err).toBe(null);
        expect(articles.items.length).toBe(0);
        expect(articles.total).toBe(0);
        done();
      });
    });
  });

  it('should get a single article by id', done => {

    expect.assertions(5);

    const tag = 'sample-1';

    component().start({ config, logger, tag, }, (err, cms) => {
      expect(err).toBe(null);
      cms.getArticle(1, (err, article) => {
        expect(err).toBe(null);
        expect(article).toBeDefined();
        expect(article.id).toBe(1);
        expect(article.title).toBe('Article 1');
        done();
      });
    });
  });

  it('should respond with undefined for missing article', done => {
    expect.assertions(3);

    const tag = 'sample-1';

    component().start({ config, logger, tag, }, (err, cms) => {
      expect(err).toBe(null);
      cms.getArticle(5, (err, article) => {
        expect(err).toBe(null);
        expect(article).toBeUndefined();
        done();
      });
    });
  });

  it('should respond with undefined when no articles', done => {
    expect.assertions(3);

    const tag = 'no-articles';

    component().start({ config, logger, tag, }, (err, cms) => {
      expect(err).toBe(null);
      cms.getArticle(1, (err, article) => {
        expect(err).toBe(null);
        expect(article).toBeUndefined();
        done();
      });
    });
  });

  it('should load content on instruction', (done) => {

    expect.assertions(6);

    const tag = 'sample-1';

    component().start({ config, logger, tag, }, (err, cms) => {
      expect(err).toBe(null);
      cms.getArticle(5, (err, article) => {
        expect(err).toBe(null);
        expect(article).toBeUndefined();

        cms.loadContent('sample-2', err => {
          expect(err).toBe(null);
          cms.getArticle(5, (err, article) => {
            expect(err).toBe(null);
            expect(article).toBeDefined();
            done();
          });
        });
      });
    });

  });

  it('should report load errors due to undefined tag', done => {

    expect.assertions(2);

    component().start({ config, logger, }, (err, cms) => {
      expect(err).toBeDefined();
      expect(err.message).toMatch(/ENOENT: no such file or directory/);
      done();
    });
  });

  it('should report load errors due to missing tag', done => {

    expect.assertions(2);

    component().start({ config, logger, tag: 'missing', }, (err, cms) => {
      expect(err).toBeDefined();
      expect(err.message).toMatch(/ENOENT: no such file or directory/);
      done();
    });
  });

});