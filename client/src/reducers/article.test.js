import {
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_NOT_FOUND,
  FETCH_ARTICLE_ERROR,
} from '../actions/articleActions';
import reduce from './article';

describe('Article Reducer', () => {

  describe('Fetch Article Request', () => {

    it('should mark new article as loading', () => {
      const state = reduce(undefined, { type: FETCH_ARTICLE_REQUEST, loading: true, article: { id: 'A', }, });
      expect(state.data).toBeDefined();
      expect(state.data.id).toBe('A');
      expect(state.meta.loading).toBe(true);
    });

    it('should mark existing article as loading', () => {
      const initialState = {
        data: {
          A: {
            loading: false,
          },
        },
      };
      const state = reduce(initialState, { type: FETCH_ARTICLE_REQUEST, loading: true, article: { id: 'A', }, });
      expect(state.meta.loading).toBe(true);
    });

  });

  describe('Fetch Article Success', () => {

    it('should mark new article as loaded', () => {
      const state = reduce(undefined, { type: FETCH_ARTICLE_SUCCESS, loading: false, article: { id: 'A', }, });
      expect(state.meta.loading).toBe(false);
    });

    it('should mark existing article as loaded', () => {
      const initialState = {
        data: {
          A: {
            loading: false,
          },
        },
      };
      const state = reduce(initialState, { type: FETCH_ARTICLE_REQUEST, loading: false, article: { id: 'A', }, });
      expect(state.meta.loading).toBe(false);
    });

    it('should decorate an article with a real date', () => {
      const state = reduce(undefined, { type: FETCH_ARTICLE_SUCCESS, loading: false, article: { id: 'A', date: '2017-01-01T00:00:00.000Z', }, });
      expect(state.data.date.toISOString()).toBe('2017-01-01T00:00:00.000Z');
    });

    it('should recover from previous errors', () => {
      const initialState = {
        data: {
          A: {
            loading: false,
            missing: true,
            error: new Error('Oh Noes!'),
          },
        },
      };
      const state = reduce(initialState, { type: FETCH_ARTICLE_SUCCESS, loading: false, article: { id: 'A', }, });
      expect(state.data).toBeDefined();
      expect(state.meta.error).toBeUndefined();
    });

  });

  describe('Fetch Article Not Found', () => {

    it('should mark new article as missing', () => {
      const state = reduce(undefined, { type: FETCH_ARTICLE_NOT_FOUND, missing: true, loading: false, article: { id: 'A', }, });
      expect(state.meta.missing).toBe(true);
    });

    it('should mark existing article as missing', () => {
      const initialState = {
        data: {
          A: {
            loading: false,
          },
        },
      };
      const state = reduce(initialState, { type: FETCH_ARTICLE_NOT_FOUND, missing: true, loading: false, article: { id: 'A', }, });
      expect(state.meta.missing).toBe(true);
    });

  });

  describe('Fetch Article Error', () => {

    it('should mark new article as in error', () => {
      const state = reduce(undefined, { type: FETCH_ARTICLE_ERROR, error: new Error('Oh Noes!'), loading: false, article: { id: 'A', }, });
      expect(state.meta.error).toBeDefined();
    });

    it('should mark existing article as in error', () => {
      const initialState = {
        data: {
          A: {
            loading: false,
          },
        },
      };
      const state = reduce(initialState, { type: FETCH_ARTICLE_ERROR, error: new Error('Oh Noes!'), loading: false, article: { id: 'A', }, });
      expect(state.meta.error).toBeDefined();
    });

  });

});
