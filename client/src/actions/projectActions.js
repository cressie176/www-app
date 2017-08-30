import fetch from 'isomorphic-fetch';

export const FETCH_PROJECT_REQUEST = 'FETCH_PROJECT_REQUEST';
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_NOT_FOUND = 'FETCH_PROJECT_NOT_FOUND';
export const FETCH_PROJECT_ERROR = 'FETCH_PROJECT_ERROR';

export function fetchProject(id, options = { quiet: false, timeout: 5000, }) {
  return async (dispatch) => {
    dispatch({ type: FETCH_PROJECT_REQUEST, project: { id, loading: true, }, });

    let project;

    try {
      const url = `/api/content/1.0/projects/${id}`;
      const res = await fetch(url, { credentials: 'same-origin', timeout: options.timeout, } );
      switch (res.status) {
        case 200: {
          project = await res.json();
          break;
        }
        case 404: {
          break;
        }
        default: {
          throw new Error(`${url} returned ${res.status} ${res.statusText}`);
        }
      }
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      dispatch({ type: FETCH_PROJECT_ERROR, project: { id, loading: false, error: error, }, });
      return;
    }

    return project
      ? dispatch({ type: FETCH_PROJECT_SUCCESS, project: Object.assign({ id, loading: false, }, project), })
      : dispatch({ type: FETCH_PROJECT_NOT_FOUND, project: { id, loading: false, missing: true, }, });
  };
}

export const FETCH_DOWNLOAD_COUNT_REQUEST = 'FETCH_DOWNLOAD_COUNT_REQUEST';
export const FETCH_DOWNLOAD_COUNT_SUCCESS = 'FETCH_DOWNLOAD_COUNT_SUCCESS';
export const FETCH_DOWNLOAD_COUNT_ERROR = 'FETCH_DOWNLOAD_COUNT_ERROR';

export function fetchDownloadCount(id, options = { quiet: false, timeout: 5000, }) {
  return async (dispatch) => {
    dispatch({ type: FETCH_DOWNLOAD_COUNT_REQUEST, project: { id, }, });

    let stats;

    try {
      const url = `https://api.npmjs.org/downloads/point/last-month/${id}`;
      const res = await fetch(url, { credentials: 'same-origin', timeout: options.timeout, } );
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
