import {
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_NOT_FOUND,
  FETCH_PAGE_ERROR,
} from '../actions/pageActions';
import reducer from './page';

describe('Page Reducer', () => {

  describe('Fetch Page Request', () => {

    it('should mark new page as loading', () => {
      const state = reducer(undefined, { type: FETCH_PAGE_REQUEST, loading: true, page: { id: 'A', }, });
      expect(state.data.id).toBe('A');
      expect(state.meta.loading).toBe(true);
    });

    it('should mark existing page as loading', () => {
      const initialState = {
        meta: {
          loading: false,
        },
      };
      const state = reducer(initialState, { type: FETCH_PAGE_REQUEST, loading: true, page: { id: 'A', }, });
      expect(state.data.id).toBe('A');
      expect(state.meta.loading).toBe(true);
    });

    it('should keep page attributes if same as previous page', () => {
      const initialState = {
        data: {
          id: 'A',
          title: 'Same Page',
        },
        meta: {
          loading: false,
        },
      };
      const state = reducer(initialState, { type: FETCH_PAGE_REQUEST, loading: true, page: { id: 'A', }, });
      expect(state.data.id).toBe('A');
      expect(state.data.title).toBe('Same Page');
      expect(state.meta.loading).toBe(true);
    });


    it('should reset page attributes if the different ot previous page', () => {
      const initialState = {
        data: {
          id: 'B',
          title: 'Different Page',
        },
        meta: {
          loading: false,
        },
      };
      const state = reducer(initialState, { type: FETCH_PAGE_REQUEST, loading: true, page: { id: 'A', }, });
      expect(state.data.id).toBe('A');
      expect(state.data.title).toBe(undefined);
      expect(state.meta.loading).toBe(true);
    });

  });

  describe('Fetch Page Success', () => {

    it('should mark new page as loaded', () => {
      const state = reducer(undefined, { type: FETCH_PAGE_SUCCESS, loading: false, page: { id: 'A', }, });
      expect(state.data.id).toBe('A');
      expect(state.meta.loading).toBe(false);
    });

    it('should mark existing page as loaded', () => {
      const initialState = {
        meta: {
          loading: false,
        },
      };
      const state = reducer(initialState, { type: FETCH_PAGE_REQUEST, loading: false, page: { id: 'A', }, });
      expect(state.data.id).toBe('A');
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
      const state = reducer(initialState, { type: FETCH_PAGE_SUCCESS, loading: false, page: { id: 'A', }, });
      expect(state.data.id).toBe('A');
      expect(state.meta.missing).toBe(false);
      expect(state.meta.error).toBeUndefined();
    });

  });

  describe('Fetch Page Not Found', () => {

    it('should mark new page as missing', () => {
      const state = reducer(undefined, { type: FETCH_PAGE_NOT_FOUND, missing: true, loading: false, page: { id: 'A', }, });
      expect(state.data.id).toBe('A');
      expect(state.meta.loading).toBe(false);
      expect(state.meta.missing).toBe(true);
    });

    it('should mark existing page as missing', () => {
      const initialState = {
        meta: {
          loading: false,
        },
      };
      const state = reducer(initialState, { type: FETCH_PAGE_NOT_FOUND, missing: true, loading: false, page: { id: 'A', }, });
      expect(state.data.id).toBe('A');
      expect(state.meta.loading).toBe(false);
      expect(state.meta.missing).toBe(true);
    });

  });

  describe('Fetch Page Error', () => {

    it('should mark new page as in error', () => {
      const state = reducer(undefined, { type: FETCH_PAGE_ERROR, error: new Error('Oh Noes!'), loading: false, page: { id: 'A', }, });
      expect(state.data.id).toBe('A');
      expect(state.meta.loading).toBe(false);
      expect(state.meta.error).toBeDefined();
    });

    it('should mark existing page as in error', () => {
      const initialState = {
        meta: {
          loading: false,
        },
      };
      const state = reducer(initialState, { type: FETCH_PAGE_ERROR, error: new Error('Oh Noes!'), loading: false, page: { id: 'A', }, });
      expect(state.data.id).toBe('A');
      expect(state.meta.loading).toBe(false);
      expect(state.meta.error).toBeDefined();
    });

  });


});
