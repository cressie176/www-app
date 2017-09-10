import async from 'async';
import cacheComponent from '../../lib/components/cms/cache';
import storeComponent from '../../lib/components/cms/store-memory';
import System from 'systemic';
import main from '../../lib/components/main';
import config from '../../lib/components/config';
import logging from '../../lib/components/logging';


describe.skip('Cache', () => {

  const overrides = {
    cms: {
      cache: {
        max: 2,
      },
    },
  };

  let cache;
  let store;
  let system = { stop: cb => cb(), };

  beforeEach(done => {
    system = new System()
      .include(main)
      .include(config).set('config.overrides', overrides)
      .include(logging).remove('middleware.prepper')
      .add('cms.store', storeComponent()).dependsOn('config', 'logger')
      .add('cms.cache', cacheComponent()).dependsOn('config', 'logger', { component: 'cms.store', destination: 'store', })
      .start((err, components) => {
        if (err) return done(err);
        store = components.cms.store;
        cache = components.cms.cache;
        done();
      });
  });

  afterEach(done => {
    async.series([
      store.nuke.bind(store),
      system.stop.bind(system),
    ], done);
  });

  describe('Cache', () => {

    it('should load uncached content', done => {
      store.saveContent('foo', { version: 1, }, err => {
        expect(err).toBeFalsy();
        cache.loadContent('foo', (err, content) => {
          expect(err).toBeFalsy();
          expect(content.version).toBe(1);
          done();
        });
      });
    });

    it('should return cached content', done => {
      async.series([
        store.saveContent.bind(store, 'foo', { version: 1, }),
        cache.loadContent.bind(cache, 'foo'),
        store.saveContent.bind(store, 'foo', { version: 2, }),
      ], err => {
        expect(err).toBeFalsy();
        cache.loadContent('foo', (err, content) => {
          expect(err).toBeFalsy();
          expect(content.version).toBe(1);
          done();
        });
      });
    });

    it('should return undefined when missing content', done => {
      cache.loadContent('foo', (err, content) => {
        expect(err).toBeFalsy();
        expect(content).toBe(undefined);
        done();
      });
    });

    it('should eject items from the cache when max size exceeded', done => {
      async.series([
        store.saveContent.bind(store, 'foo', { version: 1, }),
        store.saveContent.bind(store, 'bar', { version: 1, }),
        store.saveContent.bind(store, 'baz', { version: 1, }),
        cache.loadContent.bind(cache, 'foo'),
        cache.loadContent.bind(cache, 'bar'),
        cache.loadContent.bind(cache, 'baz'),
        store.saveContent.bind(store, 'foo', { version: 2, }),
      ], err => {
        expect(err).toBeFalsy();
        cache.loadContent('foo', (err, content) => {
          expect(err).toBeFalsy();
          expect(content.version).toBe(2);
          done();
        });
      });

      async.series({
        content1: cache.loadContent.bind(cache, 1),
        content2: cache.loadContent.bind(cache, 2),
        content3: cache.loadContent.bind(cache, 1),
      }, (err, results) => {
        expect(err).toBeFalsy();
        expect(results.content1).toBe(results.content2);
        done();
      });
    });

    it('should save content', done => {
      cache.saveContent('foo', { version: 1, }, err => {
        expect(err).toBeFalsy();
        store.loadContent('foo', (err, content) => {
          expect(err).toBeFalsy();
          expect(content.version).toBe(1);
          done();
        });
      });
    });

    it('should optimistically cache content on save', done => {
      async.series([
        cache.saveContent.bind(cache, 'foo', { version: 1, }),
        store.saveContent.bind(store, 'foo', { version: 2, }),
      ], err => {
        expect(err).toBeFalsy();
        cache.loadContent('foo', (err, content) => {
          expect(err).toBeFalsy();
          expect(content.version).toBe(1);
          done();
        });
      });
    });
  });
});
