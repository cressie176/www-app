import {
  FETCH_REFERENCES_SUCCESS,
  FETCH_TAGS_SUCCESS,
  EXTRACT_CONTENT_SUCCESS,
  SELECT_CONTENT_SUCCESS,
  DELETE_CONTENT_SUCCESS,
} from '../actions/contentActions';

import reduce from './content';

describe('Content Reducer', () => {

  describe('Reduces References', () => {

    it('should reduce references after loading', () => {
      const state = reduce(undefined, { type: FETCH_REFERENCES_SUCCESS, references: { live: 1, }, });
      expect(state.references).toBeDefined();
      expect(state.references.live).toBe(1);
    });

    it('should reduce references after tag selection', () => {
      const initialState = {
        references: {
          stage: {},
          live: { active:true, },
        },
      };
      const state = reduce(initialState, { type: SELECT_CONTENT_SUCCESS, tag: 2, });
      expect(state.references).toBeDefined();
      expect(state.references.live.tag).toBe(2);
    });

  });

  describe('Reduces Tags', () => {

    it('should reduce tags after loading', () => {
      const state = reduce(undefined, { type: FETCH_TAGS_SUCCESS, tags: [1,] , });
      expect(state.tags).toBeDefined();
      expect(state.tags.length).toBe(1);
      expect(state.tags[0]).toBe(1);
    });

    it('should union tags after extract', () => {
      const state = reduce({ tags: [1,], }, { type: EXTRACT_CONTENT_SUCCESS, tag: 2, });
      expect(state.tags).toBeDefined();
      expect(state.tags.length).toBe(2);
      expect(state.tags[0]).toBe(1);
      expect(state.tags[1]).toBe(2);
    });

    it('should reduce tags after delete', () => {
      const state = reduce({ tags: [1, 2,], }, { type: DELETE_CONTENT_SUCCESS, tag: 2, });
      expect(state.tags).toBeDefined();
      expect(state.tags.length).toBe(1);
    });

  });

});
