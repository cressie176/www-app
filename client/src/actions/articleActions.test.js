import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  fetchArticle,
  fetchArticles,
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_NOT_FOUND,
  FETCH_ARTICLE_ERROR,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
} from '../actions/articleActions';

const mockStore = configureStore([thunk,]);

describe('Article Actions', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  it('should fetch article', async () => {

    fetchMock.mock('/api/content/1.0/articles/1', { id: 1, });

    const store = mockStore({});
    await store.dispatch(fetchArticle(1));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_ARTICLE_REQUEST);
    expect(actions[0].article.id).toBe(1);
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_ARTICLE_SUCCESS);
    expect(actions[1].article.id).toBe(1);
    expect(actions[1].loading).toBe(false);
  });

  it('should tolerate errors fetching article', async () => {

    fetchMock.mock('/api/content/1.0/articles/1', 500, );

    const store = mockStore({});
    await store.dispatch(fetchArticle(1, { quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_ARTICLE_REQUEST);
    expect(actions[0].article.id).toBe(1);
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_ARTICLE_ERROR);
    expect(actions[1].article.id).toBe(1);
    expect(actions[1].loading).toBe(false);
    expect(actions[1].error.message).toBe('/api/content/1.0/articles/1 returned 500 Internal Server Error');
  });

  it('should tolerate failures fetching article', async () => {

    fetchMock.mock('/api/content/1.0/articles/1', 404, );

    const store = mockStore({});
    await store.dispatch(fetchArticle(1, { quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_ARTICLE_REQUEST);
    expect(actions[0].article.id).toBe(1);
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_ARTICLE_NOT_FOUND);
    expect(actions[1].article.id).toBe(1);
    expect(actions[1].loading).toBe(false);
  });

  it('should timeout fetching article', async () => {

    fetchMock.mock('/api/content/1.0/articles/1', {
      throws: new Error('simulate network timeout'),
    });

    const store = mockStore({});
    await store.dispatch(fetchArticle(1, { quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_ARTICLE_REQUEST);
    expect(actions[0].article.id).toBe(1);
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_ARTICLE_ERROR);
    expect(actions[1].article.id).toBe(1);
    expect(actions[1].loading).toBe(false);
    expect(actions[1].error.message).toBe('simulate network timeout');
  });

  it('should fetch articles', async () => {

    fetchMock.mock('/api/content/1.0/articles', { '1': { id: 1, }, });

    const store = mockStore({});
    await store.dispatch(fetchArticles());

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_ARTICLES_REQUEST);
    expect(actions[0].articles).toMatchObject({});
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_ARTICLES_SUCCESS);
    expect(actions[1].articles['1'].id).toBe(1);
    expect(actions[1].loading).toBe(false);
  });

  it('should tolerate errors fetching articles', async () => {

    fetchMock.mock('/api/content/1.0/articles', 500, );

    const store = mockStore({});
    await store.dispatch(fetchArticles({ quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_ARTICLES_REQUEST);
    expect(actions[0].articles).toMatchObject({});
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_ARTICLES_ERROR);
    expect(actions[1].articles).toMatchObject({});
    expect(actions[1].loading).toBe(false);
    expect(actions[1].error.message).toBe('/api/content/1.0/articles returned 500 Internal Server Error');
  });

  it('should tolerate failures fetching articles', async () => {

    fetchMock.mock('/api/content/1.0/articles', 404, );

    const store = mockStore({});
    await store.dispatch(fetchArticles({ quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_ARTICLES_REQUEST);
    expect(actions[0].articles).toMatchObject({});
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_ARTICLES_ERROR);
    expect(actions[1].articles).toMatchObject({});
    expect(actions[1].loading).toBe(false);
    expect(actions[1].error.message).toBe('/api/content/1.0/articles returned 404 Not Found');
  });

  it('should timeout fetching article', async () => {

    fetchMock.mock('/api/content/1.0/articles', {
      throws: new Error('simulate network timeout'),
    });

    const store = mockStore({});
    await store.dispatch(fetchArticles({ quiet: true, }));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(FETCH_ARTICLES_REQUEST);
    expect(actions[0].articles).toMatchObject({});
    expect(actions[0].loading).toBe(true);

    expect(actions[1].type).toBe(FETCH_ARTICLES_ERROR);
    expect(actions[1].articles).toMatchObject({});
    expect(actions[1].loading).toBe(false);
    expect(actions[1].error.message).toBe('simulate network timeout');
  });


});

