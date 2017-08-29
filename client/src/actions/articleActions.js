export const FETCH_ARTICLE_REQUEST = 'FETCH_ARTICLE_REQUEST';
export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';
export const FETCH_ARTICLE_NOT_FOUND = 'FETCH_ARTICLE_NOT_FOUND';
export const FETCH_ARTICLE_ERROR = 'FETCH_ARTICLE_ERROR';

export function fetchArticle(id, options = { quiet: false, timeout: 5000, }) {
  return async (dispatch) => {
    dispatch({ type: FETCH_ARTICLE_REQUEST, loading: true, });

    let article;

    try {
      const url = `/api/1.0/articles/${id}`;
      const res = await fetch(url, { timeout: options.timeout, } );
      switch (res.status) {
        case 200: {
          article = await res.json();
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
      dispatch({ type: FETCH_ARTICLE_ERROR, loading: false, error, });
      return;
    }

    return article
      ? dispatch({ type: FETCH_ARTICLE_SUCCESS, loading: false, article, })
      : dispatch({ type: FETCH_ARTICLE_NOT_FOUND, loading: false, });
  };
}
