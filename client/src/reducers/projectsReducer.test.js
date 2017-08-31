import {
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_NOT_FOUND,
  FETCH_PROJECT_ERROR,
  FETCH_DOWNLOAD_COUNT_REQUEST,
  FETCH_DOWNLOAD_COUNT_SUCCESS,
  FETCH_DOWNLOAD_COUNT_ERROR,
} from '../actions/projectActions';
import projectsReducer from './projectsReducer';

describe('Projects Reducer', () => {

  describe('Fetch Project Request', () => {

    it('should mark new project as loading', () => {
      const state = projectsReducer(undefined, { type: FETCH_PROJECT_REQUEST, loading: true, project: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(true);
    });

    it('should mark existing project as loading', () => {
      const initialState = {
        items: {
          A: {
            loading: false,
          },
        },
      };
      const state = projectsReducer(initialState, { type: FETCH_PROJECT_REQUEST, loading: true, project: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(true);
    });

  });

  describe('Fetch Project Success', () => {

    it('should mark new project as loaded', () => {
      const state = projectsReducer(undefined, { type: FETCH_PROJECT_SUCCESS, loading: false, project: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(false);
    });

    it('should mark existing project as loaded', () => {
      const initialState = {
        items: {
          A: {
            loading: false,
          },
        },
      };
      const state = projectsReducer(initialState, { type: FETCH_PROJECT_REQUEST, loading: false, project: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(false);
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
      const state = projectsReducer(initialState, { type: FETCH_PROJECT_SUCCESS, loading: false, project: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].missing).toBe(false);
      expect(state.items['A'].error).toBeUndefined();
    });

  });

  describe('Fetch Project Not Found', () => {

    it('should mark new project as missing', () => {
      const state = projectsReducer(undefined, { type: FETCH_PROJECT_NOT_FOUND, missing: true, loading: false, project: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(false);
      expect(state.items['A'].missing).toBe(true);
    });

    it('should mark existing project as missing', () => {
      const initialState = {
        items: {
          A: {
            loading: false,
          },
        },
      };
      const state = projectsReducer(initialState, { type: FETCH_PROJECT_NOT_FOUND, missing: true, loading: false, project: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(false);
      expect(state.items['A'].missing).toBe(true);
    });

  });

  describe('Fetch Project Error', () => {

    it('should mark new project as in error', () => {
      const state = projectsReducer(undefined, { type: FETCH_PROJECT_ERROR, error: new Error('Oh Noes!'), loading: false, project: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(false);
      expect(state.items['A'].error).toBeDefined();
    });

    it('should mark existing project as in error', () => {
      const initialState = {
        items: {
          A: {
            loading: false,
          },
        },
      };
      const state = projectsReducer(initialState, { type: FETCH_PROJECT_ERROR, error: new Error('Oh Noes!'), loading: false, project: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].loading).toBe(false);
      expect(state.items['A'].error).toBeDefined();
    });

  });


  describe('Fetch Download Count Request', () => {

    it('should mark new project as loading', () => {
      const state = projectsReducer(undefined, { type: FETCH_DOWNLOAD_COUNT_REQUEST, loading: true, project: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].downloads_loading).toBe(true);
    });

    it('should mark existing project as loading', () => {
      const initialState = {
        items: {
          A: {
            downloads_loading: false,
          },
        },
      };
      const state = projectsReducer(initialState, { type: FETCH_DOWNLOAD_COUNT_REQUEST, loading: true, project: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].downloads_loading).toBe(true);
    });

  });

  describe('Fetch Download Count Success', () => {

    it('should mark new project as loaded', () => {
      const state = projectsReducer(undefined, { type: FETCH_DOWNLOAD_COUNT_SUCCESS, loading: false, project: { id: 'A', downloads: 1000, }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].downloads_loading).toBe(false);
    });

    it('should mark existing project as loaded', () => {
      const initialState = {
        items: {
          A: {
            downloads_loading: false,
          },
        },
      };
      const state = projectsReducer(initialState, { type: FETCH_DOWNLOAD_COUNT_REQUEST, loading: false, project: { id: 'A', downloads: 1000, }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].downloads_loading).toBe(false);
    });

    it('should update existing project with download count', () => {
      const initialState = {
        items: {
          A: {
            downloads_loading: false,
            title: 'yadda',
          },
        },
      };
      const state = projectsReducer(initialState, { type: FETCH_DOWNLOAD_COUNT_REQUEST, loading: false, project: { id: 'A', downloads: 1000, }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].title).toBe('yadda');
      expect(state.items['A'].downloads).toBe(1000);
      expect(state.items['A'].downloads_loading).toBe(false);
    });

    it('should recover from previous errors', () => {
      const initialState = {
        items: {
          A: {
            downloads_loading: false,
            downloads_missing: true,
            downloads_error: new Error('Oh Noes!'),
          },
        },
      };
      const state = projectsReducer(initialState, { type: FETCH_DOWNLOAD_COUNT_SUCCESS, loading: false, project: { id: 'A', downloads: 1000, }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].downloads).toBe(1000);
      expect(state.items['A'].downloads_missing).toBe(false);
      expect(state.items['A'].downloads_error).toBeUndefined();
    });

  });

  describe('Fetch Download Count Not Found', () => {

    it('should mark new project as missing', () => {
      const state = projectsReducer(undefined, { type: FETCH_DOWNLOAD_COUNT_REQUEST, missing: true, loading: false, project: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].downloads).toBe(undefined);
      expect(state.items['A'].downloads_loading).toBe(false);
      expect(state.items['A'].downloads_missing).toBe(true);
    });

    it('should mark existing project as missing', () => {
      const initialState = {
        items: {
          A: {
            downloads_loading: false,
            downloads: 1000,
          },
        },
      };
      const state = projectsReducer(initialState, { type: FETCH_DOWNLOAD_COUNT_REQUEST, missing: true, loading: false, project: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].downloads).toBe(1000);
      expect(state.items['A'].downloads_loading).toBe(false);
      expect(state.items['A'].downloads_missing).toBe(true);
    });

  });

  describe('Fetch Download Count Error', () => {

    it('should mark new project as in error', () => {
      const state = projectsReducer(undefined, { type: FETCH_DOWNLOAD_COUNT_ERROR, error: new Error('Oh Noes!'), loading: false, project: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].downloads_loading).toBe(false);
      expect(state.items['A'].downloads_error).toBeDefined();
    });

    it('should mark existing project as in error', () => {
      const initialState = {
        items: {
          A: {
            downloads_loading: false,
            downloads: 1000,
          },
        },
      };
      const state = projectsReducer(initialState, { type: FETCH_DOWNLOAD_COUNT_ERROR, error: new Error('Oh Noes!'), loading: false, project: { id: 'A', }, });
      expect(state.items).toBeDefined();
      expect(state.items['A']).toBeDefined();
      expect(state.items['A'].id).toBe('A');
      expect(state.items['A'].downloads).toBe(1000);
      expect(state.items['A'].downloads_loading).toBe(false);
      expect(state.items['A'].downloads_error).toBeDefined();
    });
  });

});
