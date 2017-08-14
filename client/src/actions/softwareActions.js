export const FETCH_DOWNLOAD_COUNT_REQUEST = 'FETCH_DOWNLOAD_COUNT_REQUEST';
export const FETCH_DOWNLOAD_COUNT_SUCCESS = 'FETCH_DOWNLOAD_COUNT_SUCCESS';
export const FETCH_DOWNLOAD_COUNT_FAILURE = 'FETCH_DOWNLOAD_COUNT_FAILURE';

export function fetchDownloadCount(id) {
  return async (dispatch) => {
    dispatch({ type: FETCH_DOWNLOAD_COUNT_REQUEST, project: { id, }, });

    let stats;

    try {
      const response = await fetch(`https://api.npmjs.org/downloads/point/last-month/${id}`);
      stats = await response.json();
    } catch(err) {
      return dispatch({ type: FETCH_DOWNLOAD_COUNT_FAILURE, project: { id, }, });
    }

    return dispatch({ type: FETCH_DOWNLOAD_COUNT_SUCCESS, project: { id, downloads: stats.downloads, }, });
  };
}
