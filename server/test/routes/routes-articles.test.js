import request from 'request-promise';
import errors from 'request-promise/errors';
import createSystem from '../test-system';

describe('Articles', () => {

  let system;
  let config;

  const cms = {};

  beforeAll(cb => {
    system = createSystem().set('cms', cms).start((err, components) => {
      if (err) return cb(err);
      config = components.config;
      cb();
    });
  });

  afterAll(cb => {
    system.stop(cb);
  });

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
        url: `http://${config.server.host}:${config.server.port}/api/1.0/articles`,
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
        return cb(Object.assign(new Error('Oh Noes!'), { code: '__test', }));
      };

      await request({
        url: `http://${config.server.host}:${config.server.port}/api/1.0/articles`,
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
        url: `http://${config.server.host}:${config.server.port}/api/1.0/articles/foo-1`,
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

      await request({
        url: `http://${config.server.host}:${config.server.port}/api/1.0/articles/meh-1`,
        resolveWithFullResponse: true,
        json: true,
      }).catch(errors.StatusCodeError, (reason) => {
        expect(reason.statusCode).toBe(404);
        expect(reason.response.headers['content-type'].toLowerCase()).toBe('application/json; charset=utf-8');
      });
    });

    it('should redirect to canonical url', async () => {

      expect.assertions(2);

      cms.getArticle = function(id, cb) {
        return cb(null, {
          id: 1,
          title: 'foo',
          slug: 'foo-1',
        });
      };

      await request({
        url: `http://${config.server.host}:${config.server.port}/api/1.0/articles/bar-1`,
        resolveWithFullResponse: true,
        json: true,
        followRedirect: false,
      }).catch(errors.StatusCodeError, (reason) => {
        expect(reason.statusCode).toBe(302);
        expect(reason.response.headers['location']).toBe('/api/1.0/articles/foo-1');
      });
    });

    it('should report errors', async () => {

      expect.assertions(1);

      cms.getArticle = function(id, cb) {
        return cb(Object.assign(new Error('Oh Noes!'), { code: '__test', }));
      };

      await request({
        url: `http://${config.server.host}:${config.server.port}/api/1.0/articles/foo-1`,
        resolveWithFullResponse: true,
        json: true,
      }).catch(errors.StatusCodeError, (reason) => {
        expect(reason.statusCode).toBe(500);
      });
    });
  });

});
