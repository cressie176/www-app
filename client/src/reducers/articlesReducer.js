import {
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_NOT_FOUND,
  FETCH_ARTICLE_ERROR,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
} from '../actions/articleActions';

export default function(state = { items: {}, }, action)  {
  switch (action.type) {
    case FETCH_ARTICLE_REQUEST:
    case FETCH_ARTICLE_SUCCESS:
    case FETCH_ARTICLE_NOT_FOUND:
    case FETCH_ARTICLE_ERROR: {
      const article = extractArticle(action);
      const items = {
        ...state.items,
        ...{ [article.id]: article, },
      };
      return {
        ...state,
        ...{ items: items, },
      };
    }
    case FETCH_ARTICLES_REQUEST:
    case FETCH_ARTICLES_SUCCESS:
    case FETCH_ARTICLES_ERROR: {

      const articles = Object.keys(action.articles).reduce((memo, id) => {
        return Object.assign(memo, { [id]: extractArticle({ article: action.articles[id], }), });
      }, {});

      const items = {
        ...state.items,
        ...articles,
      };

      return {
        ...state,
        ...{ items: items, },
        ...{ loading: action.loading, error: action.error, },
      };
    }
    default: {
      return state;
    }
  }
}

function extractArticle({ article, loading = false, missing = false, error, }) {
  return {
    ...article,
    ...{ date: article.date ? new Date(article.date) : undefined, },
    ...{ loading: loading, missing: missing, error: error, },
  };
}
