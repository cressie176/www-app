export const TOGGLE_FEATURES = 'TOGGLE_FEATURES';

export function toggleFeatures(features) {
  return async (dispatch) => {
    return dispatch({ type: TOGGLE_FEATURES, features, });
  };
}

