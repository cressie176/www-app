import {
  TOGGLE_FEATURES,
} from '../actions/configActions';
import reduce from './config';

describe('Config Reducer', () => {

  describe('Toggle Features', () => {

    it('should apply new feature toggles', () => {
      const state = reduce(undefined, { type: TOGGLE_FEATURES, features: { foo: true, bar: false, }, });
      expect(state.featureToggles).toBeDefined();
      expect(state.featureToggles.foo).toBe(true);
      expect(state.featureToggles.bar).toBe(false);
    });

    it('should update existing feature toggles', () => {
      const state = reduce({ foo: false, bar: true, baz: true, }, { type: TOGGLE_FEATURES, features: { foo: true, bar: false, }, });
      expect(state.featureToggles).toBeDefined();
      expect(state.featureToggles.foo).toBe(true);
      expect(state.featureToggles.bar).toBe(false);
      expect(state.featureToggles.baz).toBeUndefined();
    });

  });

});
