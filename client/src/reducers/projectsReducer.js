import {
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_NOT_FOUND,
  FETCH_PROJECT_ERROR,
  FETCH_DOWNLOAD_COUNT_REQUEST,
  FETCH_DOWNLOAD_COUNT_SUCCESS,
  FETCH_DOWNLOAD_COUNT_ERROR,
} from '../actions/projectActions';


export default function(state = { items: {}, }, action)  {
  switch (action.type) {
    case FETCH_PROJECT_REQUEST:
    case FETCH_PROJECT_SUCCESS:
    case FETCH_PROJECT_NOT_FOUND:
    case FETCH_PROJECT_ERROR: {
      const project = Object.assign({}, state.items[action.project.id] || {}, extractProject(action));
      const items = {
        ...state.items,
        ...{ [project.id]: project, },
      };
      return {
        ...state,
        ...{ items: items, },
      };
    }
    case FETCH_DOWNLOAD_COUNT_REQUEST:
    case FETCH_DOWNLOAD_COUNT_SUCCESS:
    case FETCH_DOWNLOAD_COUNT_ERROR: {
      const project = Object.assign({}, state.items[action.project.id] || {}, extractDownloads(action));
      const items = {
        ...state.items,
        ...{ [project.id]: project, },
      };
      return {
        ...state,
        ...{ items: items, },
      };
    }
    default: {
      return state;
    }
  }
}

function extractProject({ project, loading = false, missing = false, error, }) {
  return {
    ...project,
    ...{ loading: loading, missing: missing, error: error, },
  };
}

function extractDownloads({ project, loading = false, missing = false, error, }) {
  return {
    ...project,
    ...{ downloads_loading: loading, downloads_missing: missing, downloads_error: error, },
  };
}
