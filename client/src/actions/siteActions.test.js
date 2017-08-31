import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  fetchSite,
  FETCH_SITE_REQUEST,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_NOT_FOUND,
  FETCH_SITE_ERROR,
} from '../actions/siteActions';

const mockStore = configureStore([thunk,]);

describe('Site Actions', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  it('should fetch site', async () => {

    fetchMock.mock('/api/content/1.0/site', { copyright: 2017, });

    const store = mockStore({});
    await store.dispatch(fetchSite());

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_SITE_REQUEST);
    expect(actions[0].site).toMatchObject({});
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_SITE_SUCCESS);
    expect(actions[1].site.copyright).toBe(2017);
    expect(actions[1].loading).toBe(false);
  });

  it('should tolerate errors fetching site', async () => {

    fetchMock.mock('/api/content/1.0/site', 500, );

    const store = mockStore({});
    await store.dispatch(fetchSite({ quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_SITE_REQUEST);
    expect(actions[0].site).toMatchObject({});
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_SITE_ERROR);
    expect(actions[1].site).toMatchObject({});
    expect(actions[1].loading).toBe(false);
    expect(actions[1].error.message).toBe('/api/content/1.0/site returned 500 Internal Server Error');
  });

  it('should tolerate failures fetching site', async () => {

    fetchMock.mock('/api/content/1.0/site', 404, );

    const store = mockStore({});
    await store.dispatch(fetchSite({ quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_SITE_REQUEST);
    expect(actions[0].site).toMatchObject({});
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_SITE_NOT_FOUND);
    expect(actions[1].site).toMatchObject({});
    expect(actions[1].loading).toBe(false);
  });

  it('should timeout fetching site', async () => {

    fetchMock.mock('/api/content/1.0/site', {
      throws: new Error('simulate network timeout'),
    });

    const store = mockStore({});
    await store.dispatch(fetchSite({ quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].site).toMatchObject({});
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_SITE_ERROR);
    expect(actions[1].site).toMatchObject({});
    expect(actions[1].loading).toBe(false);
    expect(actions[1].error.message).toBe('simulate network timeout');
  });

});

