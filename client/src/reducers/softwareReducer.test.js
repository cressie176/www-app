import {
  FETCH_DOWNLOAD_COUNT_REQUEST,
  FETCH_DOWNLOAD_COUNT_SUCCESS,
} from '../actions/softwareActions';
import softwareReducer from './softwareReducer';

describe('Software Reducer', () => {

  it('should initialise projects', () => {
      const state = softwareReducer(undefined, { type: FETCH_DOWNLOAD_COUNT_REQUEST, project: { id: 'yadda', }, });
      expect(state.projects.yadda).toBeDefined();
  });

  it('should update project with download counts', () => {
      const state = softwareReducer(undefined, { type: FETCH_DOWNLOAD_COUNT_SUCCESS, project: { id: 'yadda', downloads: 1000, }, });
      expect(state.projects.yadda).toBeDefined();
      expect(state.projects.yadda.downloads).toBe(1000);
  });

});
