import {
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_NOT_FOUND,
  FETCH_ARTICLE_ERROR,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
} from '../actions/articleActions';

export default function(state = {}, action)  {
  switch (action.type) {
    case FETCH_ARTICLE_REQUEST:
    case FETCH_ARTICLE_SUCCESS:
    case FETCH_ARTICLE_NOT_FOUND:
    case FETCH_ARTICLE_ERROR: {
      return {
        ...state,
        ...{ [action.article.id]: decorate(action.article), },
      };
    }
    case FETCH_ARTICLES_REQUEST:
    case FETCH_ARTICLES_SUCCESS:
    case FETCH_ARTICLES_ERROR: {
      const articles = Object.keys(action.articles).reduce((memo, id) => {
        return Object.assign(memo, { [id]: decorate(action.articles[id]), });
      }, {});
      return {
        ...state,
        ...articles,
      };
    }
    default: {
      return state;
    }
  }
}

function decorate(article) {
  return {
    ...article,
    ...{ date: new Date(article.date), },
  };
}
