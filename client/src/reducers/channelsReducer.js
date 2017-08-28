import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
} from '../actions/channelActions';

export default function(state = {}, action)  {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
    case FETCH_ARTICLES_SUCCESS:
    case FETCH_ARTICLES_ERROR: {
      const channels = {
        [action.channel]: {
          id: action.channel,
          articles: action.articles || { items: [], total: 0, },
          loading: action.loading,
          error: action.error,
        },
      };
      return {
        ...state,
        ...channels,
      };
    }
    default: {
      return state;
    }
  }
}
