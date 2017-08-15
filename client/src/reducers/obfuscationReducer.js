import {
  REMOVE_ELEMENT_OBFUSCATION,
  REMOVE_ALL_OBFUSCATION,
} from '../actions/obfuscationActions';

export default function(state = { contact: true, }, action)  {
  switch (action.type) {
    case REMOVE_ELEMENT_OBFUSCATION: {
      return {
        ...state,
        ...{ [action.id]: false, },
      };
    }
    case REMOVE_ALL_OBFUSCATION: {
      return {};
    }
    default: {
      return state;
    }
  }
}
