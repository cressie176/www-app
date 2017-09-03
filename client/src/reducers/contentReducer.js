import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_ERROR,
  EXTRACT_CONTENT_REQUEST,
  EXTRACT_CONTENT_SUCCESS,
  EXTRACT_CONTENT_ERROR,
  DELETE_CONTENT_REQUEST,
  DELETE_CONTENT_SUCCESS,
  DELETE_CONTENT_ERROR,
} from '../actions/contentActions';

export default function(state = { tags: [], references: [], }, action)  {
  switch (action.type) {
    case FETCH_TAGS_REQUEST:
    case FETCH_TAGS_SUCCESS:
    case FETCH_TAGS_ERROR: {
      return {
        ...state,
        ...{ tags: action.tags, },
        ...{ loading: action.loading, error: action.error, },
      };
    }
    case EXTRACT_CONTENT_REQUEST:
    case EXTRACT_CONTENT_SUCCESS:
    case EXTRACT_CONTENT_ERROR: {
      const tags = state.tags.indexOf(action.tag) >= 0 ? state.tags : state.tags.concat(action.tag);
      return {
        ...state,
        ...{ tags: tags, },
        ...{ loading: action.loading, error: action.error, },
      };
    }
    case DELETE_CONTENT_REQUEST:
    case DELETE_CONTENT_SUCCESS:
    case DELETE_CONTENT_ERROR: {
      const tags = state.tags.filter(tag => tag === action.tag);
      return {
        ...state,
        ...{ tags: tags, },
        ...{ loading: action.loading, error: action.error, },
      };
    }
    default: {
      return state;
    }
  }
}
