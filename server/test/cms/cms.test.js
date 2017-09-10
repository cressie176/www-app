import async from 'async';
import createSystem from '../test-system';
import human from '../../lib/components/logging/human';
import storeComponent from '../../lib/components/cms/store-memory';

describe.skip('CMS', () => {

  let cms, store;
  let system = { stop: cb => cb(), };

  const loggerOptions = {};

  beforeAll(done => {
    system = createSystem()
      .set('transports.human', human(loggerOptions))
      .set('cms.store', storeComponent()).dependsOn('config', 'logger')
      .set('transports.human', human(loggerOptions)).start((err, components) => {
        if (err) return done(err);
        store = components.cms.store;
        cms = components.cms.client;
        initContent(done);
      });
  });

  beforeEach(initContent);

  afterEach(done => {
    loggerOptions.suppress = false;
    store.nuke(done);
  });

  afterAll(done => {
    system.stop(done);
  });

  function initContent(cb) {
    async.series([
      store.saveContent.bind(store, 1, {
        site: {
          id: 'SITE',
        },
        pages: {
          home: {
            id: 'HOME',
          },
        },
        projects: {
          yadda: {
            id: 'YADDA',
          },
        },
        articles: {
          '1000': {
            id: '1000',
            title: 'Article 1000',
          },
        },
      }),
      store.saveContent.bind(store, 2, {}),
      store.saveReference.bind(store, { tag: '1', }),
    ], cb);
  }

  describe('Get Site', () => {

    it('should get site', done => {

      cms.getSite(1, (err, site) => {
        expect(err).toBe(null);
        expect(site.id).toBe('SITE');
        done();
      });
    });

    it('should tolerate no site', done => {

      cms.getSite(2, (err, site) => {
        expect(err).toBe(null);
        expect(site).toBe(undefined);
        done();
      });
    });

    it('should tolerate no content', done => {

      cms.getSite(3, (err, site) => {
        expect(err).toBe(null);
        expect(site).toBe(undefined);
        done();
      });
    });
  });

  describe('Get Page', () => {

    it('should get page by id', done => {

      cms.getPage(1, 'home', (err, page) => {
        expect(err).toBe(null);
        expect(page.id).toBe('HOME');
        done();
      });
    });

    it('should tolerate missing page', done => {

      cms.getPage(1, 'missing', (err, page) => {
        expect(err).toBe(null);
        expect(page).toBe(undefined);
        done();
      });
    });

    it('should tolerate no pages', done => {

      cms.getPage(2, 'home', (err, page) => {
        expect(err).toBe(null);
        expect(page).toBe(undefined);
        done();
      });
    });

    it('should tolerate no content', done => {

      cms.getPage(3, 'home', (err, page) => {
        expect(err).toBe(null);
        expect(page).toBe(undefined);
        done();
      });
    });
  });

  describe('Get Project', () => {

    it('should get project by id', done => {

      cms.getProject(1, 'yadda', (err, project) => {
        expect(err).toBe(null);
        expect(project.id).toBe('YADDA');
        done();
      });
    });

    it('should tolerate missing project', done => {

      cms.getProject(1, 'missing', (err, project) => {
        expect(err).toBe(null);
        expect(project).toBe(undefined);
        done();
      });
    });

    it('should tolerate no projects', done => {

      cms.getProject(2, 'yadda', (err, project) => {
        expect(err).toBe(null);
        expect(project).toBe(undefined);
        done();
      });
    });

    it('should tolerate no content', done => {

      cms.getProject(3, 'yadda', (err, project) => {
        expect(err).toBe(null);
        expect(project).toBe(undefined);
        done();
      });
    });
  });


  describe('List Articles', () => {

    it('should get list of articles', done => {

      cms.listArticles(1, (err, articles) => {
        expect(err).toBe(null);
        expect(articles['1000'].id).toBe('1000');
        done();
      });
    });

    it('should tolerate no articles', done => {

      cms.listArticles(2, (err, articles) => {
        expect(err).toBe(null);
        expect(articles).toBe(undefined);
        done();
      });
    });

    it('should tolerate no content', done => {

      cms.listArticles(3, (err, articles) => {
        expect(err).toBe(null);
        expect(articles).toBe(undefined);
        done();
      });
    });

  });

  describe('Get Article', () => {

    it('should get a single article by id', done => {

      cms.getArticle(1, '1000', (err, article) => {
        expect(err).toBe(null);
        expect(article).toBeDefined();
        expect(article.id).toBe('1000');
        expect(article.title).toBe('Article 1000');
        done();
      });
    });

    it('should tolerate for missing article', done => {
      cms.getArticle(1, 'missing', (err, article) => {
        expect(err).toBe(null);
        expect(article).toBe(undefined);
        done();
      });
    });

    it('should tolerate for no articles', done => {
      cms.getArticle(2, '1000', (err, article) => {
        expect(err).toBe(null);
        expect(article).toBe(undefined);
        done();
      });
    });

    it('should tolerate for no content', done => {
      cms.getArticle(3, '1000', (err, article) => {
        expect(err).toBe(null);
        expect(article).toBe(undefined);
        done();
      });
    });

  });

});
