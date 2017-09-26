import {
  FETCH_SITE_REQUEST,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_NOT_FOUND,
  FETCH_SITE_ERROR,
} from '../actions/siteActions';

export default function(state = { data: {}, meta: {}, }, action)  {
  switch (action.type) {
    case FETCH_SITE_REQUEST:
    case FETCH_SITE_SUCCESS:
    case FETCH_SITE_NOT_FOUND:
    case FETCH_SITE_ERROR: {
      return {
        data: getSite(action),
        meta: getSiteMetaData(action),
      };
    }
    default: {
      return state;
    }
  }
}

function getSite({ site, }) {
  return { ...site, };
}

function getSiteMetaData({ loading = false, missing = false, error, }) {
  return { loading, missing, error, };
}
