import request from '../http/request';

export const FETCH_PAGE_REQUEST = 'FETCH_PAGE_REQUEST';
export const FETCH_PAGE_SUCCESS = 'FETCH_PAGE_SUCCESS';
export const FETCH_PAGE_NOT_FOUND = 'FETCH_PAGE_NOT_FOUND';
export const FETCH_PAGE_ERROR = 'FETCH_PAGE_ERROR';

export function fetchPage(id, options = { quiet: false, }) {
  return async (dispatch) => {

    dispatch({ type: FETCH_PAGE_REQUEST, loading: true, page: { id, }, });

    let page;

    try {
      page = await request(`/api/content/1.0/pages/${id}`, { allowedStatusCodes: [404,], timeout: options.timeout, } );
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      return dispatch({ type: FETCH_PAGE_ERROR, loading: false, error, page: { id, }, });
    }

    return page
      ? dispatch({ type: FETCH_PAGE_SUCCESS, loading: false, page, })
      : dispatch({ type: FETCH_PAGE_NOT_FOUND, loading: false, missing: true, page: { id, }, });
  };
}
