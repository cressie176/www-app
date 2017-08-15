import fetch from 'isomorphic-fetch';

export const FETCH_DOWNLOAD_COUNT_REQUEST = 'FETCH_DOWNLOAD_COUNT_REQUEST';
export const FETCH_DOWNLOAD_COUNT_SUCCESS = 'FETCH_DOWNLOAD_COUNT_SUCCESS';
export const FETCH_DOWNLOAD_COUNT_ERROR = 'FETCH_DOWNLOAD_COUNT_ERROR';


export function fetchDownloadCount(id, options = { quiet: false, timeout: 5000, }) {
  return async (dispatch) => {
    dispatch({ type: FETCH_DOWNLOAD_COUNT_REQUEST, project: { id, }, });

    let stats;

    try {
      const url = `https://api.npmjs.org/downloads/point/last-month/${id}`;
      const res = await fetch(url, { timeout: options.timeout, } );
      if (res.status !== 200) throw new Error(`${url} returned ${res.status} ${res.statusText}`);
      stats = await res.json();
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      dispatch({ type: FETCH_DOWNLOAD_COUNT_ERROR, project: { id, error, }, });
      return;
    }

    return dispatch({ type: FETCH_DOWNLOAD_COUNT_SUCCESS, project: { id, downloads: stats.downloads, }, });
  };
}
