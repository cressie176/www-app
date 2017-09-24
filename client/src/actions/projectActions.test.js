import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  fetchDownloadCount,
  FETCH_DOWNLOAD_COUNT_REQUEST,
  FETCH_DOWNLOAD_COUNT_SUCCESS,
  FETCH_DOWNLOAD_COUNT_ERROR,
} from '../actions/projectActions';

const mockStore = configureStore([thunk,]);

describe('Project Actions', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  it('should fetch download count', async () => {

    fetchMock.mock('https://api.npmjs.org/downloads/point/last-month/yadda', { downloads: 1000, });

    const store = mockStore({});
    await store.dispatch(fetchDownloadCount('yadda'));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_DOWNLOAD_COUNT_REQUEST);
    expect(actions[0].projectId).toBe('yadda');

    expect(actions[1].type).toBe(FETCH_DOWNLOAD_COUNT_SUCCESS);
    expect(actions[1].projectId).toBe('yadda');
    expect(actions[1].stats.downloads).toBe(1000);
  });

  it('should tolerate errors fetching download count', async () => {

    fetchMock.mock('https://api.npmjs.org/downloads/point/last-month/yadda', 500,);

    const store = mockStore({});
    await store.dispatch(fetchDownloadCount('yadda', { quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_DOWNLOAD_COUNT_REQUEST);
    expect(actions[0].projectId).toBe('yadda');
    expect(actions[1].type).toBe(FETCH_DOWNLOAD_COUNT_ERROR);
    expect(actions[1].projectId).toBe('yadda');
    expect(actions[1].error.message).toBe('https://api.npmjs.org/downloads/point/last-month/yadda returned 500 Internal Server Error');
  });

  it('should tolerate failures fetching download count', async () => {

    fetchMock.mock('https://api.npmjs.org/downloads/point/last-month/yadda', 404,);

    const store = mockStore({});
    await store.dispatch(fetchDownloadCount('yadda', { quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_DOWNLOAD_COUNT_REQUEST);
    expect(actions[0].projectId).toBe('yadda');

    expect(actions[1].type).toBe(FETCH_DOWNLOAD_COUNT_ERROR);
    expect(actions[1].projectId).toBe('yadda');
    expect(actions[1].error.message).toBe('https://api.npmjs.org/downloads/point/last-month/yadda returned 404 Not Found');
  });

  it('should timeout fetching download count', async () => {

    fetchMock.mock('https://api.npmjs.org/downloads/point/last-month/yadda', {
      throws: new Error('simulate network timeout'),
    });

    const store = mockStore({});
    await store.dispatch(fetchDownloadCount('yadda', { quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_DOWNLOAD_COUNT_REQUEST);
    expect(actions[0].projectId).toBe('yadda');

    expect(actions[1].type).toBe(FETCH_DOWNLOAD_COUNT_ERROR);
    expect(actions[1].projectId).toBe('yadda');
    expect(actions[1].error.message).toBe('simulate network timeout');
  });

});

