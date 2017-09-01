import request from 'request-promise';
import errors from 'request-promise/errors';
import createSystem from '../test-system';
import human from '../../lib/components/logging/human';

describe('Content API', () => {

  let system;
  let config;

  const loggerOptions = {};

  beforeAll(cb => {
    system = createSystem().set('transports.human', human(loggerOptions)).start((err, components) => {
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

  describe('Get Page', () => {

    it('should get a single page by id', async () => {

      expect.assertions(3);

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

      loggerOptions.suppress = true;

      await request({
        url: `http://${config.server.host}:${config.server.port}/api/content/1.0/pages/does-not-exist`,
        resolveWithFullResponse: true,
        json: true,
      }).catch(errors.StatusCodeError, (reason) => {
        expect(reason.statusCode).toBe(404);
        expect(reason.response.headers['content-type'].toLowerCase()).toBe('application/json; charset=utf-8');
      });
    });
  });

  describe('Get Project', () => {

    it('should get a single project by id', async () => {

      expect.assertions(3);

      const res = await request({
        url: `http://${config.server.host}:${config.server.port}/api/content/1.0/projects/yadda`,
        resolveWithFullResponse: true,
        json: true,
      });

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type'].toLowerCase()).toBe('application/json; charset=utf-8');
      expect(res.body.id).toBe('yadda');
    });

    it('should respond with 404 for missing projects', async () => {

      expect.assertions(2);

      loggerOptions.suppress = true;

      await request({
        url: `http://${config.server.host}:${config.server.port}/api/content/1.0/projects/does-not-exist`,
        resolveWithFullResponse: true,
        json: true,
      }).catch(errors.StatusCodeError, (reason) => {
        expect(reason.statusCode).toBe(404);
        expect(reason.response.headers['content-type'].toLowerCase()).toBe('application/json; charset=utf-8');
      });
    });
  });


  describe('List Articles', () => {

    it('should get list of articles', async () => {

      expect.assertions(6);

      const res = await request({
        url: `http://${config.server.host}:${config.server.port}/api/content/1.0/articles`,
        resolveWithFullResponse: true,
        json: true,
      });

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type'].toLowerCase()).toBe('application/json; charset=utf-8');
      expect(Object.keys(res.body).length).toBe(3);
      expect(res.body[1].id).toBe(1);
      expect(res.body[2].id).toBe(2);
      expect(res.body[3].id).toBe(3);
    });

  });

  describe('Get Article', () => {
    it('should get a single article by id', async () => {

      expect.assertions(4);

      const res = await request({
        url: `http://${config.server.host}:${config.server.port}/api/content/1.0/articles/1`,
        resolveWithFullResponse: true,
        json: true,
      });

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type'].toLowerCase()).toBe('application/json; charset=utf-8');
      expect(res.body.id).toBe(1);
      expect(res.body.title).toBe('Enterprise Grade Microservices');
    });

    it('should respond with 404 for missing articles', async () => {

      expect.assertions(2);

      loggerOptions.suppress = true;

      await request({
        url: `http://${config.server.host}:${config.server.port}/api/content/1.0/articles/9999`,
        resolveWithFullResponse: true,
        json: true,
      }).catch(errors.StatusCodeError, (reason) => {
        expect(reason.statusCode).toBe(404);
        expect(reason.response.headers['content-type'].toLowerCase()).toBe('application/json; charset=utf-8');
      });
    });
  });
});
