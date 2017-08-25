import {
  TYPE_KEY,
  FINISH_TYPING,
} from '../actions/errorActions';

const initialState = {
  message: '',
  finishedTyping: false,
  fullMessage: 'It is pitch black. You are likely to be eaten by a grue.',
};

export default function(state = initialState, action)  {
  switch (action.type) {
    case TYPE_KEY: {
      return {
        ...state,
        ...{ message: state.message + action.key, },
      };
    }
    case FINISH_TYPING: {
      return {
        ...state,
        ...{ finishedTyping: true, },
      };
    }
    default: {
      return state;
    }
  }
}
