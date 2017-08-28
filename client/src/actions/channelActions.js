export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_ERROR = 'FETCH_ARTICLES_ERROR';

export function fetchArticles(channel, options = { quiet: false, timeout: 5000, }) {
  return async (dispatch) => {
    dispatch({ type: FETCH_ARTICLES_REQUEST, channel, loading: true, });

    let articles;

    try {
      const url = `/api/1.0/articles?channel=${channel}`;
      const res = await fetch(url, { timeout: options.timeout, } );
      if (res.status !== 200) throw new Error(`${url} returned ${res.status} ${res.statusText}`);
      articles = await res.json();
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      dispatch({ type: FETCH_ARTICLES_ERROR, channel, loading: false, error, });
      return;
    }

    return dispatch({ type: FETCH_ARTICLES_SUCCESS, channel, loading: false, articles, });
  };
}
