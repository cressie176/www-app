import request from './request';

export const FETCH_PROJECT_REQUEST = 'FETCH_PROJECT_REQUEST';
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_NOT_FOUND = 'FETCH_PROJECT_NOT_FOUND';
export const FETCH_PROJECT_ERROR = 'FETCH_PROJECT_ERROR';

export const FETCH_DOWNLOAD_COUNT_REQUEST = 'FETCH_DOWNLOAD_COUNT_REQUEST';
export const FETCH_DOWNLOAD_COUNT_SUCCESS = 'FETCH_DOWNLOAD_COUNT_SUCCESS';
export const FETCH_DOWNLOAD_COUNT_ERROR = 'FETCH_DOWNLOAD_COUNT_ERROR';

export function fetchProject(id, options = { quiet: false, }) {
  return async (dispatch) => {

    dispatch({ type: FETCH_PROJECT_REQUEST, loading: true, project: { id, }, });

    let project;

    try {
      project = await request(`/api/content/1.0/projects/${id}`, { allowedStatusCodes: [404,], timeout: options.timeout, });
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      return dispatch({ type: FETCH_PROJECT_ERROR, loading: false, error, project: { id, }, });
    }

    return project
      ? dispatch({ type: FETCH_PROJECT_SUCCESS, loading: false, project, })
      : dispatch({ type: FETCH_PROJECT_NOT_FOUND, loading: false, missing: true, project: { id, }, });
  };
}

export function fetchDownloadCount(id, options = { quiet: false, }) {
  return async (dispatch) => {

    dispatch({ type: FETCH_DOWNLOAD_COUNT_REQUEST, loading_stats: true, project: { id, }, });

    let stats;

    try {
      stats = await request(`https://api.npmjs.org/downloads/point/last-month/${id}`, { timeout: options.timeout, });
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      return dispatch({ type: FETCH_DOWNLOAD_COUNT_ERROR, loading_stats: false, error, project: { id, }, });
    }

    return dispatch({ type: FETCH_DOWNLOAD_COUNT_SUCCESS, loading_stats: false, project: { id, downloads: stats.downloads, }, });
  };
}
