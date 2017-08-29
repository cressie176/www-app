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
    case FETCH_PAGE_ERROR: {
      return {
        ...state,
        ...action.page,
      };
    }
    case FETCH_PAGE_NOT_FOUND: {
      return {
        ...state,
        ...{ missing: true, },
      };
    }
    default: {
      return state;
    }
  }
}
