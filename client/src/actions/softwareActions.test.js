import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  fetchDownloadCount,
  FETCH_DOWNLOAD_COUNT_REQUEST,
  FETCH_DOWNLOAD_COUNT_SUCCESS,
  FETCH_DOWNLOAD_COUNT_ERROR,
} from '../actions/softwareActions';
import nock from 'nock'

const mockStore = configureStore([thunk])

describe('Software Actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch download count', async () => {

    nock('https://api.npmjs.org')
      .get('/downloads/point/last-month/yadda')
      .reply(200, { downloads: 1000, });

    const store = mockStore({})
    await store.dispatch(fetchDownloadCount('yadda'))

    const actions = store.getActions()
    expect(actions).toHaveLength(2)
    expect(actions[0].type).toBe(FETCH_DOWNLOAD_COUNT_REQUEST)
    expect(actions[0].project.id).toBe('yadda')

    expect(actions[1].type).toBe(FETCH_DOWNLOAD_COUNT_SUCCESS)
    expect(actions[1].project.id).toBe('yadda')
    expect(actions[1].project.downloads).toBe(1000)
  })

  it('should tolerate errors fetching download count', async () => {

    nock('https://api.npmjs.org')
      .get(/.*/)
      .replyWithError('Oh Noes!');

    const store = mockStore({})
    await store.dispatch(fetchDownloadCount('yadda', { quiet: true }))

    const actions = store.getActions()
    expect(actions).toHaveLength(2)
    expect(actions[0].type).toBe(FETCH_DOWNLOAD_COUNT_REQUEST)
    expect(actions[0].project.id).toBe('yadda')

    expect(actions[1].type).toBe(FETCH_DOWNLOAD_COUNT_ERROR)
    expect(actions[1].project.id).toBe('yadda')
    expect(actions[1].project.error.message).toBe('request to https://api.npmjs.org/downloads/point/last-month/yadda failed, reason: Oh Noes!')
  })

  it('should tolerate failures fetching download count', async () => {

    nock('https://api.npmjs.org')
      .get(/.*/)
      .reply(500, {});

    const store = mockStore({})
    await store.dispatch(fetchDownloadCount('yadda', { quiet: true }))

    const actions = store.getActions()
    expect(actions).toHaveLength(2)
    expect(actions[0].type).toBe(FETCH_DOWNLOAD_COUNT_REQUEST)
    expect(actions[0].project.id).toBe('yadda')

    expect(actions[1].type).toBe(FETCH_DOWNLOAD_COUNT_ERROR)
    expect(actions[1].project.id).toBe('yadda')
    expect(actions[1].project.error.message).toBe('https://api.npmjs.org/downloads/point/last-month/yadda returned 500 Internal Server Error')
  })

  it('should timeout fetching download count', async () => {

    nock('https://api.npmjs.org')
      .get(/.*/)
      .delayConnection(500)
      .reply(200, { downloads: 1000, });

    const store = mockStore({})
    await store.dispatch(fetchDownloadCount('yadda', { quiet: true, timeout: 100 }));

    const actions = store.getActions()
    expect(actions).toHaveLength(2)
    expect(actions[0].type).toBe(FETCH_DOWNLOAD_COUNT_REQUEST)
    expect(actions[0].project.id).toBe('yadda')

    expect(actions[1].type).toBe(FETCH_DOWNLOAD_COUNT_ERROR)
    expect(actions[1].project.id).toBe('yadda')
    expect(actions[1].project.error.message).toBe('network timeout at: https://api.npmjs.org/downloads/point/last-month/yadda')
  })

})

