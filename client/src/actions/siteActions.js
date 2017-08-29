export const FETCH_SITE_REQUEST = 'FETCH_SITE_REQUEST';
export const FETCH_SITE_SUCCESS = 'FETCH_SITE_SUCCESS';
export const FETCH_SITE_ERROR = 'FETCH_SITE_ERROR';

export function fetchSite(options = { quiet: false, timeout: 5000, }) {
  return async (dispatch) => {
    dispatch({ type: FETCH_SITE_REQUEST, loading: true, site: {}, });

    let site;

    try {
      const url = `/api/content/1.0/site`;
      const res = await fetch(url, { timeout: options.timeout, } );
      if (res.status !== 200) throw new Error(`${url} returned ${res.status} ${res.statusText}`);
      site = await res.json();
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      dispatch({ type: FETCH_SITE_ERROR, loading: false, error, site: {}, });
      return;
    }

    return dispatch({ type: FETCH_SITE_SUCCESS, loading: false, site, });
  };
}
