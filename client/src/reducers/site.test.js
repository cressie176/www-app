import {
  FETCH_SITE_REQUEST,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_NOT_FOUND,
  FETCH_SITE_ERROR,
} from '../actions/siteActions';
import reduce from './site';

describe('Site Reducer', () => {

  describe('Fetch Site Request', () => {

    it('should mark new page as loading', () => {
      const state = reduce(undefined, { type: FETCH_SITE_REQUEST, loading: true, site: { copyright: 2017, }, });
      expect(state.data.copyright).toBe(2017);
      expect(state.meta.loading).toBe(true);
    });

    it('should mark existing page as loading', () => {
      const initialState = {
        meta: {
          loading: false,
        },
      };
      const state = reduce(initialState, { type: FETCH_SITE_REQUEST, loading: true, site: { copyright: 2017, }, });
      expect(state.data.copyright).toBe(2017);
      expect(state.meta.loading).toBe(true);
    });

  });

  describe('Fetch Site Success', () => {

    it('should mark new page as loaded', () => {
      const state = reduce(undefined, { type: FETCH_SITE_SUCCESS, loading: false, site: { copyright: 2017, }, });
      expect(state.data.copyright).toBe(2017);
      expect(state.meta.loading).toBe(false);
    });

    it('should mark existing page as loaded', () => {
      const initialState = {
        meta: {
          loading: false,
        },
      };
      const state = reduce(initialState, { type: FETCH_SITE_REQUEST, loading: false, site: { copyright: 2017, }, });
      expect(state.data.copyright).toBe(2017);
      expect(state.meta.loading).toBe(false);
    });

    it('should recover from previous errors', () => {
      const initialState = {
        meta: {
          loading: false,
          missing: true,
          error: new Error('Oh Noes!'),
        },
      };
      const state = reduce(initialState, { type: FETCH_SITE_SUCCESS, loading: false, site: { copyright: 2017, }, });
      expect(state.data.copyright).toBe(2017);
      expect(state.meta.missing).toBe(false);
      expect(state.meta.error).toBeUndefined();
    });

  });

  describe('Fetch Site Not Found', () => {

    it('should mark new page as missing', () => {
      const state = reduce(undefined, { type: FETCH_SITE_NOT_FOUND, missing: true, loading: false, site: { copyright: 2017, }, });
      expect(state.data.copyright).toBe(2017);
      expect(state.meta.loading).toBe(false);
      expect(state.meta.missing).toBe(true);
    });

    it('should mark existing page as missing', () => {
      const initialState = {
        meta: {
          loading: false,
        },
      };
      const state = reduce(initialState, { type: FETCH_SITE_NOT_FOUND, missing: true, loading: false, site: { copyright: 2017, }, });
      expect(state.data.copyright).toBe(2017);
      expect(state.meta.loading).toBe(false);
      expect(state.meta.missing).toBe(true);
    });

  });

  describe('Fetch Site Error', () => {

    it('should mark new page as in error', () => {
      const state = reduce(undefined, { type: FETCH_SITE_ERROR, error: new Error('Oh Noes!'), loading: false, site: { copyright: 2017, }, });
      expect(state.data.copyright).toBe(2017);
      expect(state.meta.loading).toBe(false);
      expect(state.meta.error).toBeDefined();
    });

    it('should mark existing page as in error', () => {
      const initialState = {
        meta: {
          loading: false,
        },
      };
      const state = reduce(initialState, { type: FETCH_SITE_ERROR, error: new Error('Oh Noes!'), loading: false, site: { copyright: 2017, }, });
      expect(state.data.copyright).toBe(2017);
      expect(state.meta.loading).toBe(false);
      expect(state.meta.error).toBeDefined();
    });

  });


});
