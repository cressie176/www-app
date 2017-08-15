export const REMOVE_OBFUSCATION = 'REMOVE_OBFUSCATION';

export function removeObfuscation(id) {
  return async (dispatch) => {
    return dispatch({ type: REMOVE_OBFUSCATION, id, });
  };
}
