import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  fetchPage,
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_NOT_FOUND,
  FETCH_PAGE_ERROR,
} from '../actions/pageActions';

const mockStore = configureStore([thunk,]);

describe('Page Actions', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  it('should fetch page', async () => {

    fetchMock.mock('/api/content/1.0/pages/home', { id: 'home', });

    const store = mockStore({});
    await store.dispatch(fetchPage('home'));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_PAGE_REQUEST);
    expect(actions[0].page.id).toBe('home');
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_PAGE_SUCCESS);
    expect(actions[1].page.id).toBe('home');
    expect(actions[1].loading).toBe(false);
  });

  it('should tolerate errors fetching page', async () => {

    fetchMock.mock('/api/content/1.0/pages/home', 500, );

    const store = mockStore({});
    await store.dispatch(fetchPage('home', { quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_PAGE_REQUEST);
    expect(actions[0].page.id).toBe('home');
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_PAGE_ERROR);
    expect(actions[1].page.id).toBe('home');
    expect(actions[1].loading).toBe(false);
    expect(actions[1].error.message).toBe('/api/content/1.0/pages/home returned 500 Internal Server Error');
  });

  it('should tolerate failures fetching page', async () => {

    fetchMock.mock('/api/content/1.0/pages/home', 404, );

    const store = mockStore({});
    await store.dispatch(fetchPage('home', { quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_PAGE_REQUEST);
    expect(actions[0].page.id).toBe('home');
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_PAGE_NOT_FOUND);
    expect(actions[1].page.id).toBe('home');
    expect(actions[1].loading).toBe(false);
  });

  it('should timeout fetching page', async () => {

    fetchMock.mock('/api/content/1.0/pages/home', {
      throws: new Error('simulate network timeout'),
    });

    const store = mockStore({});
    await store.dispatch(fetchPage('home', { quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_PAGE_REQUEST);
    expect(actions[0].page.id).toBe('home');
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_PAGE_ERROR);
    expect(actions[1].page.id).toBe('home');
    expect(actions[1].loading).toBe(false);
    expect(actions[1].error.message).toBe('simulate network timeout');
  });

});

