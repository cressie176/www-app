import {
  FETCH_SITE_REQUEST,
  FETCH_SITE_SUCCESS,
  FETCH_SITE_ERROR,
} from '../actions/siteActions';

export default function(state = {}, action)  {
  switch (action.type) {
    case FETCH_SITE_REQUEST:
    case FETCH_SITE_SUCCESS:
    case FETCH_SITE_ERROR: {
      return action.site;
    }
    default: {
      return state;
    }
  }
}
