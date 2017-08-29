export const FETCH_ARTICLE_REQUEST = 'FETCH_ARTICLE_REQUEST';
export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';
export const FETCH_ARTICLE_NOT_FOUND = 'FETCH_ARTICLE_NOT_FOUND';
export const FETCH_ARTICLE_ERROR = 'FETCH_ARTICLE_ERROR';

export function fetchArticle(id, options = { quiet: false, timeout: 5000, }) {
  return async (dispatch) => {
    dispatch({ type: FETCH_ARTICLE_REQUEST, article: { id, loading: true, }, });

    let article;

    try {
      const url = `/api/content/1.0/articles/${id}`;
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
      dispatch({ type: FETCH_ARTICLE_ERROR, article: { id, loading: false, error: error, }, });
      return;
    }

    return article
      ? dispatch({ type: FETCH_ARTICLE_SUCCESS, article: Object.assign({ id, loading: false, }, article), })
      : dispatch({ type: FETCH_ARTICLE_NOT_FOUND, article: { id, loading: false, missing: true, }, });
  };
}

export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_ERROR = 'FETCH_ARTICLES_ERROR';

export function fetchArticles(options = { quiet: false, timeout: 5000, }) {
  return async (dispatch) => {
    dispatch({ type: FETCH_ARTICLES_REQUEST, loading: true, articles: {}, });

    let articles;

    try {
      const url = `/api/content/1.0/articles`;
      const res = await fetch(url, { timeout: options.timeout, } );
      if (res.status !== 200) throw new Error(`${url} returned ${res.status} ${res.statusText}`);
      articles = await res.json();
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      dispatch({ type: FETCH_ARTICLES_ERROR, loading: false, error, articles: {}, });
      return;
    }

    return dispatch({ type: FETCH_ARTICLES_SUCCESS, loading: false, articles, });
  };
}
