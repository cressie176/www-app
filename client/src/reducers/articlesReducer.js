import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
} from '../actions/articlesActions';

export default function(state = { items: [], total: 0, loading: false, }, action)  {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
    case FETCH_ARTICLES_SUCCESS:
    case FETCH_ARTICLES_ERROR: {
      return {
        ...state,
        ...action.articles,
        ...{
          loading: action.loading,
          error: action.error,
        },
      };
    }
    default: {
      return state;
    }
  }
}
