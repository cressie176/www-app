import {
  FETCH_REFERENCES_REQUEST,
  FETCH_REFERENCES_SUCCESS,
  FETCH_REFERENCES_ERROR,
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_ERROR,
  EXTRACT_CONTENT_REQUEST,
  EXTRACT_CONTENT_SUCCESS,
  EXTRACT_CONTENT_ERROR,
  SELECT_CONTENT_REQUEST,
  SELECT_CONTENT_SUCCESS,
  SELECT_CONTENT_ERROR,
  DELETE_CONTENT_REQUEST,
  DELETE_CONTENT_SUCCESS,
  DELETE_CONTENT_ERROR,
} from '../actions/contentActions';

export default function(state = { tags: [], references: {}, activeReference: {},}, action)  {
  switch (action.type) {
    case FETCH_REFERENCES_REQUEST:
    case FETCH_REFERENCES_SUCCESS:
    case FETCH_REFERENCES_ERROR: {
      return {
        ...state,
        references: action.references,
        loading: action.loading,
        error: action.error,
      };
    }
    case FETCH_TAGS_REQUEST:
    case FETCH_TAGS_SUCCESS:
    case FETCH_TAGS_ERROR: {
      return {
        ...state,
        tags: action.tags,
        loading: action.loading,
        error: action.error,
      };
    }
    case EXTRACT_CONTENT_REQUEST:
    case EXTRACT_CONTENT_SUCCESS:
    case EXTRACT_CONTENT_ERROR: {
      const tags = state.tags.indexOf(action.tag) >= 0 ? state.tags : state.tags.concat(action.tag);
      return {
        ...state,
        tags: tags,
        loading: action.loading,
        error: action.error,
      };
    }
    case SELECT_CONTENT_REQUEST:
    case SELECT_CONTENT_SUCCESS:
    case SELECT_CONTENT_ERROR: {
      const activeReferenceId = Object.keys(state.references).find(id => state.references[id].active);
      const activeReference = Object.assign({}, state.references[activeReferenceId], { tag: action.tag, });
      const references = {
        ...state.references,
        [activeReferenceId]: activeReference,
      };
      return {
        ...state,
        references,
        loading: action.loading,
        error: action.error,
      };
    }
    case DELETE_CONTENT_REQUEST:
    case DELETE_CONTENT_SUCCESS:
    case DELETE_CONTENT_ERROR: {
      const tags = state.tags.filter(tag => tag !== action.tag);
      return {
        ...state,
        tags: tags,
        loading: action.loading,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}
