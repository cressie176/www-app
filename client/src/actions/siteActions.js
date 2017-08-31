import request from './request';

export const FETCH_SITE_REQUEST = 'FETCH_SITE_REQUEST';
export const FETCH_SITE_SUCCESS = 'FETCH_SITE_SUCCESS';
export const FETCH_SITE_NOT_FOUND = 'FETCH_SITE_NOT_FOUND';
export const FETCH_SITE_ERROR = 'FETCH_SITE_ERROR';

export function fetchSite(options = { quiet: false, }) {
  return async (dispatch) => {

    dispatch({ type: FETCH_SITE_REQUEST, loading: true, site: {}, });

    let site;

    try {
      site = await request('/api/content/1.0/site', { allowedStatusCodes: [404,], timeout: options.timeout, });
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      return dispatch({ type: FETCH_SITE_ERROR, loading: false, error, site: {}, });
    }

    return site
      ? dispatch({ type: FETCH_SITE_SUCCESS, loading: false, site, })
      : dispatch({ type: FETCH_SITE_NOT_FOUND, loading: false, missing: true, site: {}, });
  };
}
