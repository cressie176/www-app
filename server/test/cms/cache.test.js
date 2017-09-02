import component from '../../lib/components/cms/cache';
import async from 'async';

describe('Cache', () => {

  const logger = {
    info: () => {},
    error: () => {},
  };

  const config = {
    max: 2,
  };

  const store = {
    loadContent: (tag, cb) => {
      if (tag >= 0) return cb(null, { version: tag })
      cb(new Error('Oh Noes!'));
    }
  }

  describe('Cache', () => {

    it('should load uncached content', done => {
      component().start({ logger, config, store }, (err, cache) => {
        expect(err).toBe(null);
        cache.loadContent(1, (err, content) => {
          expect(err).toBe(null);
          expect(content.version).toBe(1);
          done();
        })
      })
    });

    it('should return cached content', done => {
      component().start({ logger, config, store }, (err, cache) => {
        expect(err).toBe(null);
        async.series({
          content1: cache.loadContent.bind(cache, 1),
          content2: cache.loadContent.bind(cache, 1),
        }, (err, results) => {
          expect(err).toBe(null);
          expect(results.content1).toBe(results.content2)
          done()
        })
      })
    });

    it('should return cached content', done => {
      component().start({ logger, config, store }, (err, cache) => {
        expect(err).toBe(null);
        async.series({
          content1: cache.loadContent.bind(cache, 1),
          content2: cache.loadContent.bind(cache, 2),
        }, (err, results) => {
          expect(err).toBe(null);
          expect(results.content1).not.toBe(results.content2)
          done()
        })
      })
    });

    it('should return cached content', done => {
      component().start({ logger, config, store }, (err, cache) => {
        expect(err).toBe(null);
        async.series({
          content1: cache.loadContent.bind(cache, 1),
          content2: cache.loadContent.bind(cache, 2),
          content3: cache.loadContent.bind(cache, 3),
          content4: cache.loadContent.bind(cache, 4),
        }, (err, results) => {
          expect(err).toBe(null);
          expect(results.content1).not.toBe(results.content4)
          done()
        })
      })
    });

    it('should relay errors', done => {
      component().start({ logger, config, store }, (err, cache) => {
        expect(err).toBe(null);
        cache.loadContent(-1, (err, content) => {
          expect(err).toBeDefined();
          expect(err.message).toBe('Oh Noes!');
          done();
        })
      })
    });
  })
});
