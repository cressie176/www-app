import {
  TOGGLE_FEATURES,
} from '../actions/configActions';

export default function(state = { featureToggles: {}, }, action)  {
  switch (action.type) {
    case TOGGLE_FEATURES: {
      return {
        ...state,
        featureToggles: action.features,
      };
    }
    default: {
      return state;
    }
  }
}
