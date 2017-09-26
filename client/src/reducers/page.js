import {
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_NOT_FOUND,
  FETCH_PAGE_ERROR,
} from '../actions/pageActions';


export default function(state = { data: {}, meta: {}, }, action)  {
  switch (action.type) {
    case FETCH_PAGE_REQUEST:
    case FETCH_PAGE_SUCCESS:
    case FETCH_PAGE_NOT_FOUND:
    case FETCH_PAGE_ERROR: {
      return {
        data: getPage(state, action),
        meta: getPageMetaData(action),
      };
    }
    default: {
      return state;
    }
  }
}

function getPage(state, { page = {}, }) {
  // Prevents flicker while redirecting to canonical url
  const mergePage = (state.data && state.data.id === page.id) ? state.data : {};
  return {
    ...mergePage,
    ...page,
  };
}

function getPageMetaData({ loading = false, missing = false, error, }) {
  return { loading, missing, error, };
}
