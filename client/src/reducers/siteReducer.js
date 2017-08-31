import {
  FETCH_SITE_REQUEST,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_NOT_FOUND,
  FETCH_SITE_ERROR,
} from '../actions/siteActions';

export default function(state = {}, action)  {
  switch (action.type) {
    case FETCH_SITE_REQUEST:
    case FETCH_SITE_SUCCESS:
    case FETCH_SITE_NOT_FOUND:
    case FETCH_SITE_ERROR: {
      const site = extractSite(action);
      return {
        ...state,
        ...site,
      };
    }
    default: {
      return state;
    }
  }
}

function extractSite({ site, loading = false, missing = false, error, }) {
  return {
    ...site,
    ...{ loading: loading, missing: missing, error: error, },
  };
}
