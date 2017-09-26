import {
  FETCH_DOWNLOAD_COUNT_REQUEST,
  FETCH_DOWNLOAD_COUNT_SUCCESS,
  FETCH_DOWNLOAD_COUNT_ERROR,
} from '../actions/projectActions';

export default function(state = { stats: { data: {}, meta: {}, }, }, action)  {
  switch (action.type) {
    case FETCH_DOWNLOAD_COUNT_REQUEST:
    case FETCH_DOWNLOAD_COUNT_SUCCESS:
    case FETCH_DOWNLOAD_COUNT_ERROR: {

      const project = {
        ...state[action.projectId],
        stats: {
          data: getStats(action),
          meta: getStatsMetaData(action),
        },
      };

      return {
        ...state,
        [action.projectId]: project,
      };
    }
    default: {
      return state;
    }
  }
}

function getStats({ stats = {}, }) {
  return stats;
}

function getStatsMetaData({ loading, error, }) {
  return { loading, error, };
}
