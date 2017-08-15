import {
  REMOVE_OBFUSCATION,
} from '../actions/obfuscationActions';
import obfuscationReducer from './obfuscationReducer';

describe('Obfuscation Reducer', () => {

  it('should remove obfucation', () => {
    const state = obfuscationReducer({ contact: true, }, { type: REMOVE_OBFUSCATION, id: 'contact', });
    expect(state.contact).toBe(false);
  });

  it('should work on uninitialised items ', () => {
    const state = obfuscationReducer({}, { type: REMOVE_OBFUSCATION, id: 'other', });
    expect(state.other).toBe(false);
  });

});
