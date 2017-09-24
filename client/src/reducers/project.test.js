import {
  FETCH_DOWNLOAD_COUNT_REQUEST,
  FETCH_DOWNLOAD_COUNT_SUCCESS,
  FETCH_DOWNLOAD_COUNT_ERROR,
} from '../actions/projectActions';
import reduce from './project';

describe('Project Reducer', () => {

  describe('Fetch Download Count Request', () => {

    it('should mark new project as loading', () => {
      const state = reduce(undefined, { type: FETCH_DOWNLOAD_COUNT_REQUEST, loading: true, projectId: 'A', });
      expect(state.A).toBeDefined();
      expect(state.A.stats.meta.loading).toBe(true);
    });

    it('should mark existing project as loading', () => {
      const initialState = {
        items: {
          A: {
            stats: {
              meta: {
                loading: false,
              },
            },
          },
        },
      };
      const state = reduce(initialState, { type: FETCH_DOWNLOAD_COUNT_REQUEST, loading: true, projectId: 'A', });
      expect(state.A).toBeDefined();
      expect(state.A.stats.meta.loading).toBe(true);
    });

  });

  describe('Fetch Download Count Success', () => {

    it('should mark existing project as loaded', () => {
      const initialState = {
        items: {
          A: {
            stats: {
              meta: {
                loading: true,
              },
            },
          },
        },
      };
      const state = reduce(initialState, { type: FETCH_DOWNLOAD_COUNT_REQUEST, loading: false, projectId: 'A', stats: {}, });
      expect(state.A).toBeDefined();
      expect(state.A.stats.meta.loading).toBe(false);
    });

    it('should update existing project with download count', () => {
      const initialState = {
        items: {
          A: {
            stats: {
              data: {},
            },
          },
        },
      };
      const state = reduce(initialState, { type: FETCH_DOWNLOAD_COUNT_REQUEST, loading: false, projectId: 'A', stats: { downloads: 1000, }, });
      expect(state.A).toBeDefined();
      expect(state.A.stats.data.downloads).toBe(1000);
    });

    it('should recover from previous errors', () => {
      const initialState = {
        items: {
          A: {
            stats: {
              meta: {
                error: new Error('Oh Noes!'),
              },
            },
          },
        },
      };
      const state = reduce(initialState, { type: FETCH_DOWNLOAD_COUNT_SUCCESS, loading: false, projectId: 'A', stats: {}, });
      expect(state.A).toBeDefined();
      expect(state.A.stats.meta.error).toBeUndefined();
    });

  });

  describe('Fetch Download Count Error', () => {

    it('should mark existing project as in error', () => {
      const initialState = {
        items: {
          A: {
            meta: {},
          },
        },
      };
      const state = reduce(initialState, { type: FETCH_DOWNLOAD_COUNT_ERROR, error: new Error('Oh Noes!'), projectId: 'A', });
      expect(state.A).toBeDefined();
      expect(state.A.stats.meta.error).toBeDefined();
    });
  });

});
