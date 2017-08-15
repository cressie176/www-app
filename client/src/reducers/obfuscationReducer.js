import {
  REMOVE_OBFUSCATION,
} from '../actions/obfuscationActions';

export default function(state = { contact: true, }, action)  {
  switch (action.type) {
    case REMOVE_OBFUSCATION: {
      return {
        ...state,
        ...{ [action.id]: false, },
      };
    }
    default: {
      return state;
    }
  }
}
