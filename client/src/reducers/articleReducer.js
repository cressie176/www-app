import {
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_NOT_FOUND,
  FETCH_ARTICLE_ERROR,
} from '../actions/articleActions';

export default function(state = {}, action)  {
  switch (action.type) {
    case FETCH_ARTICLE_REQUEST:
    case FETCH_ARTICLE_SUCCESS:
    case FETCH_ARTICLE_ERROR: {
      return {
        ...state,
        ...action.article,
      };
    }
    case FETCH_ARTICLE_NOT_FOUND: {
      return {
        ...state,
        ...{ missing: true, },
      };
    }
    default: {
      return state;
    }
  }
}
