import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
} from '../actions/articleActions';
import reduce from './articleList';

describe('Article List Reducer', () => {

  describe('Fetch Articles Request', () => {

    it('should indicate when article list is loading', () => {
      const state = reduce(undefined, { type: FETCH_ARTICLES_REQUEST, loading: true, articles: {}, });
      expect(state.meta.loading).toBe(true);
      expect(state.data).toBeDefined();
      expect(state.data.length).toBe(0);
    });

  });

  describe('Fetch Article List Success', () => {

    it('should indicate article list has loaded', () => {
      const state = reduce(undefined, { type: FETCH_ARTICLES_SUCCESS, loading: false, articles: { A: { id: 'A', }, }, });
      expect(state.meta.loading).toBe(false);
      expect(state.data).toBeDefined();
      expect(state.data.length).toBe(1);
      expect(state.data[0].id).toBe('A');
    });

    it('should decorate each article with a date', () => {
      const state = reduce(undefined, { type: FETCH_ARTICLES_SUCCESS, loading: false, articles: { A: { id: 'A', date: '2017-07-07T15:16:17.000Z', }, }, });
      expect(state.meta.loading).toBe(false);
      expect(state.data).toBeDefined();
      expect(state.data.length).toBe(1);
      expect(state.data[0].date.toISOString()).toBe('2017-07-07T15:16:17.000Z');
    });

    it('should recover from previous errors', () => {
      const initialState = {
        meta: {
          error: new Error('Oh Noes!'),
        },
      };
      const state = reduce(initialState, { type: FETCH_ARTICLES_SUCCESS, articles: { A: { id: 'A', }, }, });
      expect(state.meta.error).toBeUndefined();
    });

  });

  describe('Fetch Articles Error', () => {

    it('should report errors', () => {
      const state = reduce(undefined, { type: FETCH_ARTICLES_ERROR, error: new Error('Oh Noes!'), });
      expect(state.meta.error).toBeDefined();
    });

  });

});
