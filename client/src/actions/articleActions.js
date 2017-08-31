import request from './request';

export const FETCH_ARTICLE_REQUEST = 'FETCH_ARTICLE_REQUEST';
export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';
export const FETCH_ARTICLE_NOT_FOUND = 'FETCH_ARTICLE_NOT_FOUND';
export const FETCH_ARTICLE_ERROR = 'FETCH_ARTICLE_ERROR';

export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_ERROR = 'FETCH_ARTICLES_ERROR';

export function fetchArticle(id, options = { quiet: false, }) {
  return async (dispatch) => {

    dispatch({ type: FETCH_ARTICLE_REQUEST, loading: true, article: { id, }, });

    let article;

    try {
      article = await request(`/api/content/1.0/articles/${id}`, { allowedStatusCodes: [404,], timeout: options.timeout, });
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      return dispatch({ type: FETCH_ARTICLE_ERROR, loading: false, error, article: { id, }, });
    }

    return article
      ? dispatch({ type: FETCH_ARTICLE_SUCCESS, loading: false, article, })
      : dispatch({ type: FETCH_ARTICLE_NOT_FOUND, loading: false, missing: true, article: { id, }, });
  };
}

export function fetchArticles(options = { quiet: false, }) {
  return async (dispatch) => {

    dispatch({ type: FETCH_ARTICLES_REQUEST, loading: true, articles: {}, });

    let articles;

    try {
      articles = await request(`/api/content/1.0/articles`, { timeout: options.timeout, });
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      return dispatch({ type: FETCH_ARTICLES_ERROR, loading: false, error, articles: {}, });
    }

    return dispatch({ type: FETCH_ARTICLES_SUCCESS, loading: false, articles, });
  };
}

