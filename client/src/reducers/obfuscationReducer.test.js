import {
  REMOVE_ELEMENT_OBFUSCATION,
  REMOVE_ALL_OBFUSCATION,
} from '../actions/obfuscationActions';
import obfuscationReducer from './obfuscationReducer';

describe('Obfuscation Reducer', () => {

  it('should remove obfucation', () => {
    const state = obfuscationReducer({ contact: true, }, { type: REMOVE_ELEMENT_OBFUSCATION, id: 'contact', });
    expect(state.contact).toBe(false);
  });

  it('should work on uninitialised items', () => {
    const state = obfuscationReducer({}, { type: REMOVE_ELEMENT_OBFUSCATION, id: 'other', });
    expect(state.other).toBe(false);
  });

  it('should remove all obfucation', () => {
    const state = obfuscationReducer({ contact: true, }, { type: REMOVE_ALL_OBFUSCATION, });
    expect(state.contact).toBeUndefined();
  });

});
