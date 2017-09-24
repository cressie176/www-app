import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
} from '../actions/articleActions';

export default function(state = { data: [], meta: {}, }, action)  {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
    case FETCH_ARTICLES_SUCCESS:
    case FETCH_ARTICLES_ERROR: {
      return {
        ...state,
        data: getArticleList(action),
        meta: getMetaData(action),
      };
    }
    default: {
      return state;
    }
  }
}

function getArticleList(action) {
  return Object.keys(action.articles || []).map(id => getArticle(action.articles[id]));
}

function getArticle(article) {
  return {
    ...article,
    date: article.date ? new Date(article.date) : undefined,
  };
}

function getMetaData({ loading = false, error = undefined, }) {
  return { loading, error, };
}
