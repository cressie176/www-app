export const FETCH_PAGE_REQUEST = 'FETCH_PAGE_REQUEST';
export const FETCH_PAGE_SUCCESS = 'FETCH_PAGE_SUCCESS';
export const FETCH_PAGE_NOT_FOUND = 'FETCH_PAGE_NOT_FOUND';
export const FETCH_PAGE_ERROR = 'FETCH_PAGE_ERROR';

export function fetchPage(id, options = { quiet: false, timeout: 5000, }) {
  return async (dispatch) => {
    dispatch({ type: FETCH_PAGE_REQUEST, loading: true, });

    let page;

    try {
      const url = `/api/content/1.0/pages/${id}`;

      const res = await fetch(url, { timeout: options.timeout, } );
      switch (res.status) {
        case 200: {
          page = await res.json();
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
      dispatch({ type: FETCH_PAGE_ERROR, loading: false, error, });
      return;
    }

    return page
      ? dispatch({ type: FETCH_PAGE_SUCCESS, loading: false, page, })
      : dispatch({ type: FETCH_PAGE_NOT_FOUND, loading: false, });
  };
}
