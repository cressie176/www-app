export const TYPE_KEY = 'TYPE_KEY';
export const FINISH_TYPING = 'FINISH_TYPING';

export function typeKey(key, position) {
  return async (dispatch) => {
    return dispatch({ type: TYPE_KEY, key: key, });
  };
}

export function finishTyping(key, position) {
  return async (dispatch) => {
    return dispatch({ type: FINISH_TYPING, });
  };
}

