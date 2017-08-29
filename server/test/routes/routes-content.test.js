import request from 'request-promise';
import errors from 'request-promise/errors';
import createSystem from '../test-system';
import human from '../../lib/components/logging/human';

describe('Articles', () => {

  let system;
  let config;

  const cms = {};
  const loggerOptions = {};

  beforeAll(cb => {
    system = createSystem().set('transports.human', human(loggerOptions)).set('cms', cms).start((err, components) => {
      if (err) return cb(err);
      config = components.config;
      cb();
    });
  });

  afterAll(cb => {
    system.stop(cb);
  });

  afterEach(() => {
    loggerOptions.suppress = false;
  });

  describe('Content API', () => {

    describe('Get Page', () => {

      it('should get a single page by id', async () => {

        expect.assertions(4);

        cms.getPage = function(id, cb) {
          expect(id).toBe('home');
          return cb(null, {
            id: 'home'
          });
        };

        const res = await request({
          url: `http://${config.server.host}:${config.server.port}/api/content/1.0/pages/home`,
          resolveWithFullResponse: true,
          json: true,
        });

        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type'].toLowerCase()).toBe('application/json; charset=utf-8');
        expect(res.body.id).toBe('home');
      });

      it('should respond with 404 for missing pages', async () => {

        expect.assertions(2);

        cms.getPage = function(id, cb) {
          return cb(null, null);
        };

        loggerOptions.suppress = true;

        await request({
          url: `http://${config.server.host}:${config.server.port}/api/content/1.0/pages/home`,
          resolveWithFullResponse: true,
          json: true,
        }).catch(errors.StatusCodeError, (reason) => {
          expect(reason.statusCode).toBe(404);
          expect(reason.response.headers['content-type'].toLowerCase()).toBe('application/json; charset=utf-8');
        });
      });

      it('should report errors', async () => {

        expect.assertions(1);

        cms.getPage = function(id, cb) {
          return cb(new Error('Oh Noes!'));
        };

        loggerOptions.suppress = true;

        await request({
          url: `http://${config.server.host}:${config.server.port}/api/content/1.0/articles/1`,
          resolveWithFullResponse: true,
          json: true,
        }).catch(errors.StatusCodeError, (reason) => {
          expect(reason.statusCode).toBe(500);
        });
      });

    })

    describe('List Articles', () => {

      it('should get list of articles sorted by date desc and id desc', async () => {

        expect.assertions(8);

        cms.listArticles = function(channel, cb) {
          return cb(null, {
            total: 4,
            items: [
              {
                id: 1,
                date: new Date('2001-01-01T00:00:00.000Z'),
              },
              {
                id: 2,
                date: new Date('2000-01-01T00:00:00.000Z'),
              },
              {
                id: 3,
                date: new Date('2003-01-01T00:00:00.000Z'),
              },
              {
                id: 4,
                date: new Date('2003-01-01T00:00:00.000Z'),
              },
            ],
          });
        };

        const res = await request({
          url: `http://${config.server.host}:${config.server.port}/api/content/1.0/articles`,
          resolveWithFullResponse: true,
          json: true,
        });


        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type'].toLowerCase()).toBe('application/json; charset=utf-8');
        expect(res.body.items.length).toBe(4);
        expect(res.body.total).toBe(4);

        expect(res.body.items[0].id).toBe(4);
        expect(res.body.items[1].id).toBe(3);
        expect(res.body.items[2].id).toBe(1);
        expect(res.body.items[3].id).toBe(2);
      });

      it('should report errors', async () => {

        expect.assertions(1);

        cms.listArticles = function(channel, cb) {
          return cb(new Error('Oh Noes!'));
        };

        loggerOptions.suppress = true;

        await request({
          url: `http://${config.server.host}:${config.server.port}/api/content/1.0/articles`,
          resolveWithFullResponse: true,
          json: true,
        }).catch(errors.StatusCodeError, (reason) => {
          expect(reason.statusCode).toBe(500);
        });
      });
    });


    describe('Get Article', () => {
      it('should get a single article by id', async () => {

        expect.assertions(5);

        cms.getArticle = function(id, cb) {
          expect(id).toBe(1);
          return cb(null, {
            id: 1,
            title: 'foo',
            slug: 'foo-1',
          });
        };

        const res = await request({
          url: `http://${config.server.host}:${config.server.port}/api/content/1.0/articles/1`,
          resolveWithFullResponse: true,
          json: true,
        });

        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type'].toLowerCase()).toBe('application/json; charset=utf-8');
        expect(res.body.id).toBe(1);
        expect(res.body.title).toBe('foo');
      });

      it('should respond with 404 for missing articles', async () => {

        expect.assertions(2);

        cms.getArticle = function(id, cb) {
          return cb(null, null);
        };

        loggerOptions.suppress = true;

        await request({
          url: `http://${config.server.host}:${config.server.port}/api/content/1.0/articles/1`,
          resolveWithFullResponse: true,
          json: true,
        }).catch(errors.StatusCodeError, (reason) => {
          expect(reason.statusCode).toBe(404);
          expect(reason.response.headers['content-type'].toLowerCase()).toBe('application/json; charset=utf-8');
        });
      });

      it('should report errors', async () => {

        expect.assertions(1);

        cms.getArticle = function(id, cb) {
          return cb(new Error('Oh Noes!'));
        };

        loggerOptions.suppress = true;

        await request({
          url: `http://${config.server.host}:${config.server.port}/api/content/1.0/articles/1`,
          resolveWithFullResponse: true,
          json: true,
        }).catch(errors.StatusCodeError, (reason) => {
          expect(reason.statusCode).toBe(500);
        });
      });
    });
  })
});
