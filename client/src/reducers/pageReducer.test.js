import {
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_NOT_FOUND,
  FETCH_PAGE_ERROR,
} from '../actions/pageActions';
import pageReducer from './pageReducer';

describe('Page Reducer', () => {

  describe('Fetch Page Request', () => {

    it('should mark new page as loading', () => {
      const state = pageReducer(undefined, { type: FETCH_PAGE_REQUEST, loading: true, page: { id: 'A', }, });
      expect(state.id).toBe('A');
      expect(state.loading).toBe(true);
    });

    it('should mark existing page as loading', () => {
      const initialState = {
        loading: false,
      };
      const state = pageReducer(initialState, { type: FETCH_PAGE_REQUEST, loading: true, page: { id: 'A', }, });
      expect(state.id).toBe('A');
      expect(state.loading).toBe(true);
    });

  });

  describe('Fetch Page Success', () => {

    it('should mark new page as loaded', () => {
      const state = pageReducer(undefined, { type: FETCH_PAGE_SUCCESS, loading: false, page: { id: 'A', }, });
      expect(state.id).toBe('A');
      expect(state.loading).toBe(false);
    });

    it('should mark existing page as loaded', () => {
      const initialState = {
        loading: false,
      };
      const state = pageReducer(initialState, { type: FETCH_PAGE_REQUEST, loading: false, page: { id: 'A', }, });
      expect(state.id).toBe('A');
      expect(state.loading).toBe(false);
    });

    it('should recover from previous errors', () => {
      const initialState = {
        loading: false,
        missing: true,
        error: new Error('Oh Noes!'),
      };
      const state = pageReducer(initialState, { type: FETCH_PAGE_SUCCESS, loading: false, page: { id: 'A', }, });
      expect(state.id).toBe('A');
      expect(state.missing).toBe(false);
      expect(state.error).toBeUndefined();
    });

  });

  describe('Fetch Page Not Found', () => {

    it('should mark new page as missing', () => {
      const state = pageReducer(undefined, { type: FETCH_PAGE_NOT_FOUND, missing: true, loading: false, page: { id: 'A', }, });
      expect(state.id).toBe('A');
      expect(state.loading).toBe(false);
      expect(state.missing).toBe(true);
    });

    it('should mark existing page as missing', () => {
      const initialState = {
        loading: false,
      };
      const state = pageReducer(initialState, { type: FETCH_PAGE_NOT_FOUND, missing: true, loading: false, page: { id: 'A', }, });
      expect(state.id).toBe('A');
      expect(state.loading).toBe(false);
      expect(state.missing).toBe(true);
    });

  });

  describe('Fetch Page Error', () => {

    it('should mark new page as in error', () => {
      const state = pageReducer(undefined, { type: FETCH_PAGE_ERROR, error: new Error('Oh Noes!'), loading: false, page: { id: 'A', }, });
      expect(state.id).toBe('A');
      expect(state.loading).toBe(false);
      expect(state.error).toBeDefined();
    });

    it('should mark existing page as in error', () => {
      const initialState = {
        loading: false,
      };
      const state = pageReducer(initialState, { type: FETCH_PAGE_ERROR, error: new Error('Oh Noes!'), loading: false, page: { id: 'A', }, });
      expect(state.id).toBe('A');
      expect(state.loading).toBe(false);
      expect(state.error).toBeDefined();
    });

  });


});
