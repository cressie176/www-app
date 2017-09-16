import async from 'async';
import request from 'request-promise';
import errors from 'request-promise/errors';
import createSystem from '../test-system';
import human from '../../lib/components/logging/human';
import storeComponent from '../../lib/components/cms/store-memory';

describe('Publisher API', () => {

  let store;
  let config;
  let system = { stop: cb => cb(), };

  const loggerOptions = {};

  beforeAll(done => {
    system = createSystem()
      .set('config.overrides', { server: { port: 13002, }, })
      .set('transports.human', human(loggerOptions))
      .set('cms.store', storeComponent()).dependsOn('config', 'logger')
      .set('contentful', { extract: cb => cb(null, {}), } )
      .set('transports.human', human(loggerOptions)).start((err, components) => {
        if (err) return done(err);
        config = components.config;
        store = components.cms.store;

        async.series([
          store.saveContent.bind(store, 1, { content: 'yay', }),
          store.saveReference.bind(store, { tag: '1', }),
        ], done);
      });
  });

  beforeEach(done => {
    async.series([
      store.saveContent.bind(store, 1, { content: 'yay', }),
      store.saveReference.bind(store, { tag: '1', }),
    ], done);
  });

  afterEach(done => {
    loggerOptions.suppress = false;
    store.nuke(done);
  });

  afterAll(done => {
    system.stop(done);
  });


  describe('List Tags', () => {

    it('should get list of tags', async () => {

      expect.assertions(4);

      const res = await request({
        url: `http://${config.server.host}:${config.server.port}/api/publisher/1.0/tags`,
        resolveWithFullResponse: true,
        json: true,
      });

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toBe("1");
    });

    it('should not be cached', async () => {

      expect.assertions(3);

      const res = await request({
        url: `http://${config.server.host}:${config.server.port}/api/publisher/1.0/tags`,
        resolveWithFullResponse: true,
        json: true,
      });

      expect(res.headers['cache-control']).toBe('no-cache, no-store, must-revalidate');
      expect(res.headers['pragma']).toBe('no-cache');
      expect(res.headers['expires']).toBe('0');
    });

  });

  describe('Save Content', () => {

    it('should save new content', async () => {

      expect.assertions(1);

      const res = await request({
        method: 'POST',
        url: `http://${config.server.host}:${config.server.port}/api/publisher/1.0/tags/2`,
        resolveWithFullResponse: true,
        json: true,
      });

      expect(res.statusCode).toBe(204);
    });

    it('should save new content', async (done) => {

      expect.assertions(3);

      const res = await request({
        method: 'POST',
        url: `http://${config.server.host}:${config.server.port}/api/publisher/1.0/tags/2`,
        resolveWithFullResponse: true,
        json: true,
      });

      expect(res.statusCode).toBe(204);
      store.listTags((err, tags) => {
        expect(err).toBeFalsy();
        expect(tags.length).toBe(2);
        done();
      });
    });
  });

  describe('Delete Content', () => {

    it('should delete content', async (done) => {

      expect.assertions(3);

      const res = await request({
        method: 'DELETE',
        url: `http://${config.server.host}:${config.server.port}/api/publisher/1.0/tags/1`,
        resolveWithFullResponse: true,
        json: true,
      });

      expect(res.statusCode).toBe(204);
      store.listTags((err, tags) => {
        expect(err).toBeFalsy();
        expect(tags.length).toBe(0);
        done();
      });
    });

    it('should error when deleting a missing tag', async () => {

      expect.assertions(2);

      loggerOptions.suppress = true;

      await request({
        method: 'DELETE',
        url: `http://${config.server.host}:${config.server.port}/api/publisher/1.0/tags/99`,
        resolveWithFullResponse: true,
        json: true,
      }).catch(errors.StatusCodeError, (reason) => {
        expect(reason.statusCode).toBe(500);
        expect(reason.response.headers['content-type']).toBe('application/json; charset=utf-8');
      });

    });

  });

  describe('List References', () => {

    it('should list references', async () => {

      expect.assertions(4);

      const res = await request({
        method: 'GET',
        url: `http://${config.server.host}:${config.server.port}/api/publisher/1.0/references`,
        resolveWithFullResponse: true,
        json: true,
      });

      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(res.body.test.tag).toBe("1");
      expect(res.body.test.active).toBe(true);
    });

    it('should not be cached', async () => {

      expect.assertions(3);

      const res = await request({
        url: `http://${config.server.host}:${config.server.port}/api/publisher/1.0/references`,
        resolveWithFullResponse: true,
        json: true,
      });

      expect(res.headers['cache-control']).toBe('no-cache, no-store, must-revalidate');
      expect(res.headers['pragma']).toBe('no-cache');
      expect(res.headers['expires']).toBe('0');
    });

  });

  describe('Save Reference', () => {

    it('should update reference', async (done) => {

      expect.assertions(3);

      const res = await request({
        method: 'POST',
        url: `http://${config.server.host}:${config.server.port}/api/publisher/1.0/references/2`,
        resolveWithFullResponse: true,
        json: true,
      });

      expect(res.statusCode).toBe(204);
      store.loadReference((err, reference) => {
        expect(err).toBeFalsy();
        expect(reference.tag).toBe("2");
        done();
      });
    });
  });
});
