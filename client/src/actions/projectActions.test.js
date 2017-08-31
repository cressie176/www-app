import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  fetchProject,
  fetchDownloadCount,
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_NOT_FOUND,
  FETCH_PROJECT_ERROR,
  FETCH_DOWNLOAD_COUNT_REQUEST,
  FETCH_DOWNLOAD_COUNT_SUCCESS,
  FETCH_DOWNLOAD_COUNT_ERROR,
} from '../actions/projectActions';

const mockStore = configureStore([thunk,]);

describe('Project Actions', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  it('should fetch project', async () => {

    fetchMock.mock('/api/content/1.0/projects/yadda', { id: 'yadda', });

    const store = mockStore({});
    await store.dispatch(fetchProject('yadda'));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_PROJECT_REQUEST);
    expect(actions[0].project.id).toBe('yadda');
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_PROJECT_SUCCESS);
    expect(actions[1].project.id).toBe('yadda');
    expect(actions[1].loading).toBe(false);
  });

  it('should tolerate errors fetching article', async () => {

    fetchMock.mock('/api/content/1.0/projects/yadda', 500, );

    const store = mockStore({});
    await store.dispatch(fetchProject('yadda', { quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_PROJECT_REQUEST);
    expect(actions[0].project.id).toBe('yadda');
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_PROJECT_ERROR);
    expect(actions[1].project.id).toBe('yadda');
    expect(actions[1].loading).toBe(false);
    expect(actions[1].error.message).toBe('/api/content/1.0/projects/yadda returned 500 Internal Server Error');
  });

  it('should tolerate failures fetching article', async () => {

    fetchMock.mock('/api/content/1.0/projects/yadda', 404, );

    const store = mockStore({});
    await store.dispatch(fetchProject('yadda', { quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_PROJECT_REQUEST);
    expect(actions[0].project.id).toBe('yadda');
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_PROJECT_NOT_FOUND);
    expect(actions[1].project.id).toBe('yadda');
    expect(actions[1].loading).toBe(false);
  });

  it('should timeout fetching article', async () => {

    fetchMock.mock('/api/content/1.0/projects/yadda', {
      throws: new Error('simulate network timeout'),
    });

    const store = mockStore({});
    await store.dispatch(fetchProject('yadda', { quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_PROJECT_REQUEST);
    expect(actions[0].project.id).toBe('yadda');
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_PROJECT_ERROR);
    expect(actions[1].project.id).toBe('yadda');
    expect(actions[1].loading).toBe(false);
    expect(actions[1].error.message).toBe('simulate network timeout');
  });

  it('should fetch download count', async () => {

    fetchMock.mock('https://api.npmjs.org/downloads/point/last-month/yadda', { downloads: 1000, });

    const store = mockStore({});
    await store.dispatch(fetchDownloadCount('yadda'));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_DOWNLOAD_COUNT_REQUEST);
    expect(actions[0].project.id).toBe('yadda');

    expect(actions[1].type).toBe(FETCH_DOWNLOAD_COUNT_SUCCESS);
    expect(actions[1].project.id).toBe('yadda');
    expect(actions[1].project.downloads).toBe(1000);
  });

  it('should tolerate errors fetching download count', async () => {

    fetchMock.mock('https://api.npmjs.org/downloads/point/last-month/yadda', 500,);

    const store = mockStore({});
    await store.dispatch(fetchDownloadCount('yadda', { quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_DOWNLOAD_COUNT_REQUEST);
    expect(actions[0].project.id).toBe('yadda');
    expect(actions[1].type).toBe(FETCH_DOWNLOAD_COUNT_ERROR);
    expect(actions[1].project.id).toBe('yadda');
    expect(actions[1].error.message).toBe('https://api.npmjs.org/downloads/point/last-month/yadda returned 500 Internal Server Error');
  });

  it('should tolerate failures fetching download count', async () => {

    fetchMock.mock('https://api.npmjs.org/downloads/point/last-month/yadda', 404,);

    const store = mockStore({});
    await store.dispatch(fetchDownloadCount('yadda', { quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_DOWNLOAD_COUNT_REQUEST);
    expect(actions[0].project.id).toBe('yadda');

    expect(actions[1].type).toBe(FETCH_DOWNLOAD_COUNT_ERROR);
    expect(actions[1].project.id).toBe('yadda');
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
    expect(actions[0].project.id).toBe('yadda');

    expect(actions[1].type).toBe(FETCH_DOWNLOAD_COUNT_ERROR);
    expect(actions[1].project.id).toBe('yadda');
    expect(actions[1].error.message).toBe('simulate network timeout');
  });

});

