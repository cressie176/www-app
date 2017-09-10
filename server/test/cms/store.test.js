import fsStore from '../../lib/components/cms/store-fs';
import memoryStore from '../../lib/components/cms/store-memory';
import async from 'async';
import path from 'path';
import System from 'systemic';
import main from '../../lib/components/main';
import config from '../../lib/components/config';
import logging from '../../lib/components/logging';

describe('Store', () => {

  describe('Memory', () => {
    tests(memoryStore);
  });

  describe('FileSystem', () => {

    tests(fsStore, {
      cms: {
        store: {
          content: {
            path: path.join(__dirname, 'testdata', 'content', 'data'),
          },
          reference: {
            path: path.join(__dirname, 'testdata', 'content', 'references'),
          },
        },
      },
    });
  });

  function tests(storeComponent, overrides = {}) {

    let store;
    let system = { stop: cb => cb(), };

    beforeEach(done => {
      system = new System()
        .include(main)
        .include(config).set('config.overrides', overrides)
        .include(logging).remove('middleware.prepper')
        .add('cms.store', storeComponent()).dependsOn('config', 'logger')
        .start((err, components) => {
          if (err) return done(err);
          store = components.cms.store;
          done();
        });
    });

    afterEach(done => {
      async.series([
        store.nuke.bind(store),
        system.stop.bind(system),
      ], done);
    });

    it('Should list tags', done => {
      async.each(['foo', 'bar', 'baz',], (tag, cb) => {
        store.saveContent(tag, {}, cb);
      }, err => {
        expect(err).toBeFalsy();
        store.listTags((err, tags) => {
          expect(err).toBeFalsy();
          expect(tags.length).toBe(3);
          expect(tags.sort()[0]).toBe('bar');
          done();
        });
      });
    });

    it('Should load content', done => {
      store.saveContent('foo', { foo: 1, }, err => {
        expect(err).toBeFalsy();
        store.loadContent('foo', (err, content) => {
          expect(err).toBeFalsy();
          expect(content).toBeDefined();
          expect(content.foo).toBe(1);
          done();
        });
      });
    });

    it('Should delete content', done => {
      store.saveContent('foo', { foo: 1, }, err => {
        expect(err).toBeFalsy();
        store.deleteContent('foo', err => {
          expect(err).toBeFalsy();
          store.listTags((err, tags) => {
            expect(err).toBeFalsy();
            expect(tags.length).toBe(0);
            done();
          });
        });
      });
    });

    it('Should error when deleting missing content', done => {
      store.deleteContent('foo', err => {
        expect(err).toBeTruthy();
        done();
      });
    });

    it('Should save/list references', done => {
      store.saveReference({ foo: 1, }, err => {
        expect(err).toBeFalsy();
        store.listReferences((err, references) => {
          expect(err).toBeFalsy();
          expect(Object.keys(references).length).toBe(1);
          expect(references.test).toBeDefined();
          expect(references.test.foo).toBe(1);
          done();
        });
      });
    });

    it('Should indicate the active reference', done => {
      store.saveReference({ foo: 1, }, err => {
        expect(err).toBeFalsy();
        store.listReferences((err, references) => {
          expect(err).toBeFalsy();
          expect(Object.keys(references).length).toBe(1);
          expect(references.test.active).toBe(true);
          done();
        });
      });
    });

    it('Should load references', done => {
      store.saveReference({ foo: 1, }, err => {
        expect(err).toBeFalsy();
        store.loadReference((err, reference) => {
          expect(err).toBeFalsy();
          expect(reference).toBeDefined();
          expect(reference.foo).toBe(1);
          done();
        });
      });
    });

  }

});
