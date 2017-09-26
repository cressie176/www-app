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

export default function(state = { tags: [], references: {}, activeReference: {}, meta: {},}, action)  {
  switch (action.type) {
    case FETCH_REFERENCES_REQUEST:
    case FETCH_REFERENCES_SUCCESS:
    case FETCH_REFERENCES_ERROR: {
      return {
        ...state,
        references: getReferences(action),
        meta: getMetaData(action),
      };
    }
    case FETCH_TAGS_REQUEST:
    case FETCH_TAGS_SUCCESS:
    case FETCH_TAGS_ERROR: {
      return {
        ...state,
        tags: getTags(action),
        meta: getMetaData(action),
      };
    }
    case EXTRACT_CONTENT_REQUEST:
    case EXTRACT_CONTENT_SUCCESS:
    case EXTRACT_CONTENT_ERROR: {
      return {
        ...state,
        tags: unionTags(action, state),
        meta: getMetaData(action),
      };
    }
    case SELECT_CONTENT_REQUEST:
    case SELECT_CONTENT_SUCCESS:
    case SELECT_CONTENT_ERROR: {
      return {
        ...state,
        references: getDecoratedReferences(action, state),
        meta: getMetaData(action),
      };
    }
    case DELETE_CONTENT_REQUEST:
    case DELETE_CONTENT_SUCCESS:
    case DELETE_CONTENT_ERROR: {
      return {
        ...state,
        tags: getUnusedTags(action, state),
        meta: getMetaData(action),
      };
    }
    default: {
      return state;
    }
  }
}

function getReferences({ references, }) {
  return references;
}

function getTags({ tags, }) {
  return tags;
}

function unionTags({ tag, }, { tags, }) {
  return tags.indexOf(tag) >= 0 ? tags : tags.concat(tag);
}

function getUnusedTags({ tag, }, { tags, }) {
  return tags.filter(t => t !== tag);
}

function getDecoratedReferences({ tag, }, { references, }) {
  const activeReferenceId = Object.keys(references).find(id => references[id].active);
  const activeReference = Object.assign({}, references[activeReferenceId], { tag, });
  return {
    ...references,
    [activeReferenceId]: activeReference,
  };

}

function getMetaData({ loading = false, error, }) {
  return { loading, error, };
}

