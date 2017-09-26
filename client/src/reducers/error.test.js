import {
  TYPE_KEY,
  FINISH_TYPING,
} from '../actions/errorActions';
import reduce from './error';

describe('Error Reducer', () => {

  it('should simulate typing', () => {
    const state = reduce({ message: '', }, { type: TYPE_KEY, key: 'A', });
    expect(state.message).toBe('A');
  });

  it('should finish typing', () => {
    const state = reduce({}, { type: FINISH_TYPING, });
    expect(state.finishedTyping).toBe(true);
  });

});
