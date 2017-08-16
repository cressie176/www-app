export const REMOVE_ELEMENT_OBFUSCATION = 'REMOVE_ELEMENT_OBFUSCATION';
export const REMOVE_ALL_OBFUSCATION = 'REMOVE_ALL_OBFUSCATION';

export function removeObfuscation(id) {
  return async (dispatch) => {
    return dispatch({ type: REMOVE_ELEMENT_OBFUSCATION, id, });
  };
}

export function removeAllObfuscation() {
  return async (dispatch) => {
    return dispatch({ type: REMOVE_ALL_OBFUSCATION, });
  };
}
