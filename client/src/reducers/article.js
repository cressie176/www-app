import {
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_NOT_FOUND,
  FETCH_ARTICLE_ERROR,
} from '../actions/articleActions';

export default function(state = { item: {}, meta: {}, }, action)  {
  switch (action.type) {
    case FETCH_ARTICLE_REQUEST:
    case FETCH_ARTICLE_SUCCESS:
    case FETCH_ARTICLE_NOT_FOUND:
    case FETCH_ARTICLE_ERROR: {
      return {
        item: getArticle(action),
        loading: action.loading || false,
        missing: action.missing || false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}

function getArticle({ article, }) {
  return {
    ...article,
    date: article.date ? new Date(article.date) : undefined,
  };
}
