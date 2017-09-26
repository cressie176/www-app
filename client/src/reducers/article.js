import {
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_NOT_FOUND,
  FETCH_ARTICLE_ERROR,
} from '../actions/articleActions';

export default function(state = { data: {}, meta: {}, }, action)  {
  switch (action.type) {
    case FETCH_ARTICLE_REQUEST:
    case FETCH_ARTICLE_SUCCESS:
    case FETCH_ARTICLE_NOT_FOUND:
    case FETCH_ARTICLE_ERROR: {
      return {
        data: getArticle(action),
        meta: getArticleMetaData(action),
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

function getArticleMetaData({ loading = false, missing = false, error, }) {
  return { loading, missing, error, };
}
