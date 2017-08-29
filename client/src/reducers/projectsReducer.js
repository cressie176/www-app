import {
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_NOT_FOUND,
  FETCH_PROJECT_ERROR,
  FETCH_DOWNLOAD_COUNT_REQUEST,
  FETCH_DOWNLOAD_COUNT_SUCCESS,
  FETCH_DOWNLOAD_COUNT_ERROR,
} from '../actions/projectActions';


export default function(state = {}, action)  {
  switch (action.type) {
    case FETCH_PROJECT_REQUEST:
    case FETCH_PROJECT_SUCCESS:
    case FETCH_PROJECT_NOT_FOUND:
    case FETCH_PROJECT_ERROR:
    case FETCH_DOWNLOAD_COUNT_REQUEST:
    case FETCH_DOWNLOAD_COUNT_SUCCESS:
    case FETCH_DOWNLOAD_COUNT_ERROR: {
      const project = {
        ...state[action.project.id],
        ...action.project,
      };
      return {
        ...state,
        ...{ [action.project.id]: project, },
      };
    }
    default: {
      return state;
    }
  }
}
