import {
  FETCH_SITE_REQUEST,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_NOT_FOUND,
  FETCH_SITE_ERROR,
} from '../actions/siteActions';
import siteReducer from './siteReducer';

describe('Site Reducer', () => {

  describe('Fetch Site Request', () => {

    it('should mark new page as loading', () => {
      const state = siteReducer(undefined, { type: FETCH_SITE_REQUEST, loading: true, site: { copyright: 2017, }, });
      expect(state.copyright).toBe(2017);
      expect(state.loading).toBe(true);
    });

    it('should mark existing page as loading', () => {
      const initialState = {
        loading: false,
      };
      const state = siteReducer(initialState, { type: FETCH_SITE_REQUEST, loading: true, site: { copyright: 2017, }, });
      expect(state.copyright).toBe(2017);
      expect(state.loading).toBe(true);
    });

  });

  describe('Fetch Site Success', () => {

    it('should mark new page as loaded', () => {
      const state = siteReducer(undefined, { type: FETCH_SITE_SUCCESS, loading: false, site: { copyright: 2017, }, });
      expect(state.copyright).toBe(2017);
      expect(state.loading).toBe(false);
    });

    it('should mark existing page as loaded', () => {
      const initialState = {
        loading: false,
      };
      const state = siteReducer(initialState, { type: FETCH_SITE_REQUEST, loading: false, site: { copyright: 2017, }, });
      expect(state.copyright).toBe(2017);
      expect(state.loading).toBe(false);
    });

    it('should recover from previous errors', () => {
      const initialState = {
        loading: false,
        missing: true,
        error: new Error('Oh Noes!'),
      };
      const state = siteReducer(initialState, { type: FETCH_SITE_SUCCESS, loading: false, site: { copyright: 2017, }, });
      expect(state.copyright).toBe(2017);
      expect(state.missing).toBe(false);
      expect(state.error).toBeUndefined();
    });

  });

  describe('Fetch Site Not Found', () => {

    it('should mark new page as missing', () => {
      const state = siteReducer(undefined, { type: FETCH_SITE_NOT_FOUND, missing: true, loading: false, site: { copyright: 2017, }, });
      expect(state.copyright).toBe(2017);
      expect(state.loading).toBe(false);
      expect(state.missing).toBe(true);
    });

    it('should mark existing page as missing', () => {
      const initialState = {
        loading: false,
      };
      const state = siteReducer(initialState, { type: FETCH_SITE_NOT_FOUND, missing: true, loading: false, site: { copyright: 2017, }, });
      expect(state.copyright).toBe(2017);
      expect(state.loading).toBe(false);
      expect(state.missing).toBe(true);
    });

  });

  describe('Fetch Site Error', () => {

    it('should mark new page as in error', () => {
      const state = siteReducer(undefined, { type: FETCH_SITE_ERROR, error: new Error('Oh Noes!'), loading: false, site: { copyright: 2017, }, });
      expect(state.copyright).toBe(2017);
      expect(state.loading).toBe(false);
      expect(state.error).toBeDefined();
    });

    it('should mark existing page as in error', () => {
      const initialState = {
        loading: false,
      };
      const state = siteReducer(initialState, { type: FETCH_SITE_ERROR, error: new Error('Oh Noes!'), loading: false, site: { copyright: 2017, }, });
      expect(state.copyright).toBe(2017);
      expect(state.loading).toBe(false);
      expect(state.error).toBeDefined();
    });

  });


});
