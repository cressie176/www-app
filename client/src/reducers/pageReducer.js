import {
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_NOT_FOUND,
  FETCH_PAGE_ERROR,
} from '../actions/pageActions';

export default function(state = {}, action)  {
  switch (action.type) {
    case FETCH_PAGE_REQUEST:
    case FETCH_PAGE_SUCCESS:
    case FETCH_PAGE_NOT_FOUND:
    case FETCH_PAGE_ERROR: {
      const page = extractPage(action);
      return {
        ...state,
        ...page,
      };
    }
    default: {
      return state;
    }
  }
}

function extractPage({ page, loading = false, missing = false, error, }) {
  return {
    ...page,
    ...{ loading: loading, missing: missing, error: error, },
  };
}
