import component from '../../lib/components/cms/cms';

describe('CMS', () => {

  const logger = {
    info: () => {},
    error: () => {},
  };

  const config = {
    path: `${__dirname}/data`,
  };

  describe('Get Site', () => {

    it('should get site', done => {

      expect.assertions(5);

      const tag = 'sample-1';
      const store = {
        loadContent: (tag, cb) => {
          expect(tag).toBe('sample-1'); // Executed twice
          cb(null, { site: { id: 'SITE', }, });
        },
      };

      component().start({ config, logger, store, tag, }, (err, cms) => {
        expect(err).toBe(null);
        cms.getSite(tag, (err, site) => {
          expect(err).toBe(null);
          expect(site.id).toBe('SITE');
          done();
        });
      });
    });

    it('should tolerate no site', done => {

      expect.assertions(5);

      const tag = 'sample-1';
      const store = {
        loadContent: (tag, cb) => {
          expect(tag).toBe('sample-1'); // Executed twice
          cb(null, {});
        },
      };

      component().start({ config, logger, store, tag, }, (err, cms) => {
        expect(err).toBe(null);
        cms.getSite(tag, (err, site) => {
          expect(err).toBe(null);
          expect(site).toBe(undefined);
          done();
        });
      });
    });
  });

  describe('Get Page', () => {
    it('should get page by id', done => {

      expect.assertions(5);

      const tag = 'sample-1';
      const store = {
        loadContent: (tag, cb) => {
          expect(tag).toBe('sample-1'); // Executed twice
          cb(null, { pages: { home: { id: 'HOME', }, }, });
        },
      };

      component().start({ config, logger, store, tag, }, (err, cms) => {
        expect(err).toBe(null);
        cms.getPage(tag, 'home', (err, page) => {
          expect(err).toBe(null);
          expect(page.id).toBe('HOME');
          done();
        });
      });
    });

    it('should tolerate no pages', done => {

      expect.assertions(5);

      const tag = 'sample-1';
      const store = {
        loadContent: (tag, cb) => {
          expect(tag).toBe('sample-1'); // Executed twice
          cb(null, {});
        },
      };

      component().start({ config, logger, store, tag, }, (err, cms) => {
        expect(err).toBe(null);
        cms.getPage(tag, 'home', (err, page) => {
          expect(err).toBe(null);
          expect(page).toBe(undefined);
          done();
        });
      });
    });
  });

  describe('Get Project', () => {

    it('should get project by id', done => {

      expect.assertions(5);

      const tag = 'sample-1';
      const store = {
        loadContent: (tag, cb) => {
          expect(tag).toBe('sample-1'); // Executed twice
          cb(null, { projects: { yadda: { id: 'YADDA', }, }, });
        },
      };

      component().start({ config, logger, store, tag, }, (err, cms) => {
        expect(err).toBe(null);
        cms.getProject(tag, 'yadda', (err, project) => {
          expect(err).toBe(null);
          expect(project.id).toBe('YADDA');
          done();
        });
      });
    });

    it('should tolerate no projects', done => {

      expect.assertions(5);

      const tag = 'sample-1';
      const store = {
        loadContent: (tag, cb) => {
          expect(tag).toBe('sample-1'); // Executed twice
          cb(null, {});
        },
      };

      component().start({ config, logger, store, tag, }, (err, cms) => {
        expect(err).toBe(null);
        cms.getProject(tag, 'yadda', (err, project) => {
          expect(err).toBe(null);
          expect(project).toBe(undefined);
          done();
        });
      });
    });
  });


  describe('List Articles', () => {

    it('should get list of articles', done => {

      expect.assertions(5);

      const tag = 'sample-1';
      const store = {
        loadContent: (tag, cb) => {
          expect(tag).toBe('sample-1'); // Executed twice
          cb(null, { articles: { a: 1, b: 2, c: 3, d: 4, }, });
        },
      };

      component().start({ config, logger, store, tag, }, (err, cms) => {
        expect(err).toBe(null);
        cms.listArticles(tag, (err, articles) => {
          expect(err).toBe(null);
          expect(Object.keys(articles).length).toBe(4);
          done();
        });
      });
    });

    it('should tolerate no articles', done => {

      expect.assertions(5);

      const tag = 'sample-1';
      const store = {
        loadContent: (tag, cb) => {
          expect(tag).toBe('sample-1'); // Executed twice
          cb(null, {});
        },
      };

      component().start({ config, logger, store, tag, }, (err, cms) => {
        expect(err).toBe(null);
        cms.listArticles(tag, (err, articles) => {
          expect(err).toBe(null);
          expect(articles).toBe(undefined);
          done();
        });
      });
    });

  });

  describe('Get Article', () => {

    it('should get a single article by id', done => {

      expect.assertions(7);

      const tag = 'sample-1';
      const store = {
        loadContent: (tag, cb) => {
          expect(tag).toBe('sample-1'); // Executed twice
          cb(null, { articles: { '1': { id: 1, title: 'Article 1', }, },} );
        },
      };

      component().start({ config, logger, store, tag, }, (err, cms) => {
        expect(err).toBe(null);
        cms.getArticle(tag, 1, (err, article) => {
          expect(err).toBe(null);
          expect(article).toBeDefined();
          expect(article.id).toBe(1);
          expect(article.title).toBe('Article 1');
          done();
        });
      });
    });

    it('should respond with undefined for missing article', done => {
      expect.assertions(5);

      const tag = 'sample-1';
      const store = {
        loadContent: (tag, cb) => {
          expect(tag).toBe('sample-1'); // Executed twice
          cb(null, { articles: { '1': { id: 1, title: 'Article 1', }, },} );
        },
      };

      component().start({ config, logger, store, tag, }, (err, cms) => {
        expect(err).toBe(null);
        cms.getArticle(tag, 5, (err, article) => {
          expect(err).toBe(null);
          expect(article).toBe(undefined);
          done();
        });
      });
    });

    it('should respond with undefined when no articles', done => {

      expect.assertions(5);

      const tag = 'sample-1';
      const store = {
        loadContent: (tag, cb) => {
          expect(tag).toBe('sample-1'); // Executed twice
          cb(null, {} );
        },
      };

      component().start({ config, logger, store, tag, }, (err, cms) => {
        expect(err).toBe(null);
        cms.getArticle(tag, 1, (err, article) => {
          expect(err).toBe(null);
          expect(article).toBe(undefined);
          done();
        });
      });
    });
  });

});
