import {
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_NOT_FOUND,
  FETCH_ARTICLE_ERROR,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
} from '../actions/articleActions';
import articlesReducer from './articlesReducer';

describe('Article Reducer', () => {

  describe('Fetch Article Request', () => {

    it('should mark new article as loading', () => {
      const state = articlesReducer(undefined, { type: FETCH_ARTICLE_REQUEST, loading: true, article: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(true);
    });

    it('should mark existing article as loading', () => {
      const initialState = {
        items: {
          A: {
            loading: false,
          },
        },
      };
      const state = articlesReducer(initialState, { type: FETCH_ARTICLE_REQUEST, loading: true, article: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(true);
    });

  });

  describe('Fetch Article Success', () => {

    it('should mark new article as loaded', () => {
      const state = articlesReducer(undefined, { type: FETCH_ARTICLE_SUCCESS, loading: false, article: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(false);
    });

    it('should mark existing article as loaded', () => {
      const initialState = {
        items: {
          A: {
            loading: false,
          },
        },
      };
      const state = articlesReducer(initialState, { type: FETCH_ARTICLE_REQUEST, loading: false, article: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(false);
    });

    it('should decorate an article with a real date', () => {
      const state = articlesReducer(undefined, { type: FETCH_ARTICLE_SUCCESS, loading: false, article: { id: 'A', date: '2017-01-01T00:00:00.000Z', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].date.toISOString()).toBe('2017-01-01T00:00:00.000Z');
    });

    it('should recover from previous errors', () => {
      const initialState = {
        items: {
          A: {
            loading: false,
            missing: true,
            error: new Error('Oh Noes!'),
          },
        },
      };
      const state = articlesReducer(initialState, { type: FETCH_ARTICLE_SUCCESS, loading: false, article: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].missing).toBe(false);
      expect(state.items['A'].error).toBeUndefined();
    });

  });

  describe('Fetch Article Not Found', () => {

    it('should mark new article as missing', () => {
      const state = articlesReducer(undefined, { type: FETCH_ARTICLE_NOT_FOUND, missing: true, loading: false, article: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(false);
      expect(state.items['A'].missing).toBe(true);
    });

    it('should mark existing article as missing', () => {
      const initialState = {
        items: {
          A: {
            loading: false,
          },
        },
      };
      const state = articlesReducer(initialState, { type: FETCH_ARTICLE_NOT_FOUND, missing: true, loading: false, article: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(false);
      expect(state.items['A'].missing).toBe(true);
    });

  });

  describe('Fetch Article Error', () => {

    it('should mark new article as in error', () => {
      const state = articlesReducer(undefined, { type: FETCH_ARTICLE_ERROR, error: new Error('Oh Noes!'), loading: false, article: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(false);
      expect(state.items['A'].error).toBeDefined();
    });

    it('should mark existing article as in error', () => {
      const initialState = {
        items: {
          A: {
            loading: false,
          },
        },
      };
      const state = articlesReducer(initialState, { type: FETCH_ARTICLE_ERROR, error: new Error('Oh Noes!'), loading: false, article: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(false);
      expect(state.items['A'].error).toBeDefined();
    });

  });

  describe('Fetch Articles Request', () => {

    it('should mark new articles as loading', () => {
      const state = articlesReducer(undefined, { type: FETCH_ARTICLES_REQUEST, loading: true, articles: {}, });
      expect(state.loading).toBe(true);
    });

    it('should mark existing articles as loading', () => {
      const initialState = {
        loading: false,
        items: {
          A: {
            loading: false,
          },
        },
      };
      const state = articlesReducer(initialState, { type: FETCH_ARTICLES_REQUEST, loading: true, articles: {}, });
      expect(state.loading).toBe(true);
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
    });

  });

  describe('Fetch Article Success', () => {

    it('should mark new articles as loaded', () => {
      const state = articlesReducer(undefined, { type: FETCH_ARTICLES_SUCCESS, loading: false, articles: { A: { id: 'A', }, }, });
      expect(state.loading).toBe(false);
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(false);
    });

    it('should mark existing articles as loaded', () => {
      const initialState = {
        loading: false,
        items: {
          A: {
            loading: false,
          },
        },
      };
      const state = articlesReducer(initialState, { type: FETCH_ARTICLES_REQUEST, loading: false, articles: { A: { id: 'A', }, }, });
      expect(state.loading).toBe(false);
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(false);
    });

    it('should decorate articles with a real date', () => {
      const state = articlesReducer(undefined, { type: FETCH_ARTICLES_SUCCESS, loading: false, articles: { A: { id: 'A', date: '2017-01-01T00:00:00.000Z', }, }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].date.toISOString()).toBe('2017-01-01T00:00:00.000Z');
    });

    it('should recover from previous errors', () => {
      const initialState = {
        loading: false,
        error: new Error('Oh Noes!'),
        items: {
          A: {
            loading: false,
          },
        },
      };
      const state = articlesReducer(initialState, { type: FETCH_ARTICLES_SUCCESS, loading: false, articles: { A: { id: 'A', }, }, });
      expect(state.loading).toBe(false);
      expect(state.error).toBeUndefined();
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
    });

  });

  describe('Fetch Articles Error', () => {

    it('should mark new articles as in error', () => {
      const state = articlesReducer(undefined, { type: FETCH_ARTICLES_ERROR, error: new Error('Oh Noes!'), loading: false, articles: {}, });
      expect(state.loading).toBe(false);
      expect(state.error).toBeDefined();
    });

    it('should mark existing articles as in error', () => {
      const initialState = {
        loading: false,
        items: {
          A: {
            loading: false,
          },
        },
      };
      const state = articlesReducer(initialState, { type: FETCH_ARTICLES_ERROR, error: new Error('Oh Noes!'), loading: false, articles: {}, });
      expect(state.loading).toBe(false);
      expect(state.error).toBeDefined();
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
    });

  });

});
