import {
  TOGGLE_FEATURES,
} from '../actions/featureToggleActions';

export default function(state = {}, action)  {
  switch (action.type) {
    case TOGGLE_FEATURES: {
      return {
        ...state,
        ...action.features,
      };
    }
    default: {
      return state;
    }
  }
}
