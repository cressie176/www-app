import request from '../http/request';

export const FETCH_DOWNLOAD_COUNT_REQUEST = 'FETCH_DOWNLOAD_COUNT_REQUEST';
export const FETCH_DOWNLOAD_COUNT_SUCCESS = 'FETCH_DOWNLOAD_COUNT_SUCCESS';
export const FETCH_DOWNLOAD_COUNT_ERROR = 'FETCH_DOWNLOAD_COUNT_ERROR';

export function fetchDownloadCount(id, options = { quiet: false, }) {
  return async (dispatch) => {

    dispatch({ type: FETCH_DOWNLOAD_COUNT_REQUEST, projectId: id, loading: true, });

    let stats;

    try {
      stats = await request(`https://api.npmjs.org/downloads/point/last-month/${id}`, { timeout: options.timeout, });
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      return dispatch({ type: FETCH_DOWNLOAD_COUNT_ERROR, projectId: id, loading: false, error, });
    }

    return dispatch({ type: FETCH_DOWNLOAD_COUNT_SUCCESS, projectId: id, loading: false, stats, });
  };
}
