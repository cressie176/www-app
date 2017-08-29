import {
  FETCH_DOWNLOAD_COUNT_REQUEST,
  FETCH_DOWNLOAD_COUNT_SUCCESS,
} from '../actions/projectActions';
import projectsReducer from './projectsReducer';

describe('Projects Reducer', () => {

  it('should initialise projects', () => {
      const state = projectsReducer(undefined, { type: FETCH_DOWNLOAD_COUNT_REQUEST, project: { id: 'yadda', }, });
      expect(state.yadda).toBeDefined();
  });

  it('should update project with download counts', () => {
      const state = projectsReducer(undefined, { type: FETCH_DOWNLOAD_COUNT_SUCCESS, project: { id: 'yadda', downloads: 1000, }, });
      expect(state.yadda).toBeDefined();
      expect(state.yadda.downloads).toBe(1000);
  });

});
