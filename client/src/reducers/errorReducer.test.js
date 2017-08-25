import {
  TYPE_KEY,
  FINISH_TYPING,
} from '../actions/errorActions';
import errorReducer from './errorReducer';

describe('Error Reducer', () => {

  it('should simulate typing', () => {
    const state = errorReducer({ message: '', }, { type: TYPE_KEY, key: 'A', });
    expect(state.message).toBe('A');
  });

  it('should finish typing', () => {
    const state = errorReducer({}, { type: FINISH_TYPING, });
    expect(state.finishedTyping).toBe(true);
  });

});
