import request from './request';
import Cookies from 'universal-cookie';

export const FETCH_REFERENCES_REQUEST = 'FETCH_REFERENCES_REQUEST';
export const FETCH_REFERENCES_SUCCESS = 'FETCH_REFERENCES_SUCCESS';
export const FETCH_REFERENCES_ERROR = 'FETCH_REFERENCES_ERROR';

export function fetchReferences(options = { quiet: false, }) {
  return async (dispatch) => {

    dispatch({ type: FETCH_REFERENCES_REQUEST, loading: true, references: {}, });

    let references;

    try {
      references = await request(`/api/publisher/1.0/references`, { timeout: options.timeout, });
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      return dispatch({ type: FETCH_REFERENCES_ERROR, loading: false, error, references: {}, });
    }

    return dispatch({ type: FETCH_REFERENCES_SUCCESS, loading: false, references, });
  };
}


export const FETCH_TAGS_REQUEST = 'FETCH_TAGS_REQUEST';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_ERROR = 'FETCH_TAGS_ERROR';

export function fetchTags(options = { quiet: false, }) {
  return async (dispatch) => {

    dispatch({ type: FETCH_TAGS_REQUEST, loading: true, tags: [], });

    let tags;

    try {
      tags = await request(`/api/publisher/1.0/tags`, { timeout: options.timeout, });
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      return dispatch({ type: FETCH_TAGS_ERROR, loading: false, error, tags: [], });
    }

    return dispatch({ type: FETCH_TAGS_SUCCESS, loading: false, tags, });
  };
}

export const EXTRACT_CONTENT_REQUEST = 'EXTRACT_CONTENT_REQUEST';
export const EXTRACT_CONTENT_SUCCESS = 'EXTRACT_CONTENT_SUCCESS';
export const EXTRACT_CONTENT_ERROR = 'EXTRACT_CONTENT_ERROR';

export function extractContent(tag, options = { quiet: false, }) {
  return async (dispatch) => {

    dispatch({ type: EXTRACT_CONTENT_REQUEST, loading: true, tag, });

    try {
      await request(`/api/publisher/1.0/tags/${tag}`, { method: 'POST', timeout: options.timeout, });
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      return dispatch({ type: EXTRACT_CONTENT_ERROR, loading: false, error, tag, });
    }

    return dispatch({ type: EXTRACT_CONTENT_SUCCESS, loading: false, tag, });
  };
}

export const DELETE_CONTENT_REQUEST = 'DELETE_CONTENT_REQUEST';
export const DELETE_CONTENT_SUCCESS = 'DELETE_CONTENT_SUCCESS';
export const DELETE_CONTENT_ERROR = 'DELETE_CONTENT_ERROR';

export function deleteContent(tag, options = { quiet: false, }) {
  return async (dispatch) => {

    dispatch({ type: DELETE_CONTENT_REQUEST, loading: true, tag: null, });

    try {
      await request(`/api/publisher/1.0/tags/${tag}`, { method: 'DELETE', timeout: options.timeout, });
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      return dispatch({ type: DELETE_CONTENT_ERROR, loading: false, error, tag: null, });
    }

    return dispatch({ type: DELETE_CONTENT_SUCCESS, loading: false, tag, });
  };
}

export const PREVIEW_CONTENT = 'PREVIEW_CONTENT';

export function previewContent(tag, options = { quiet: false, }) {
  return async (dispatch) => {
    new Cookies().set('tag', tag, { path: '/', });
  };
}


export const SELECT_CONTENT_REQUEST = 'SELECT_CONTENT_REQUEST';
export const SELECT_CONTENT_SUCCESS = 'SELECT_CONTENT_SUCCESS';
export const SELECT_CONTENT_ERROR = 'SELECT_CONTENT_ERROR';

export function selectContent(tag, options = { quiet: false, }) {
  return async (dispatch) => {

    dispatch({ type: SELECT_CONTENT_REQUEST, loading: true, tag, });

    try {
      await request(`/api/publisher/1.0/references/${tag}`, { method: 'POST', timeout: options.timeout, });
    } catch(error) {
      if (!options.quiet) console.error(error); // eslint-disable-line no-console
      return dispatch({ type: SELECT_CONTENT_ERROR, loading: false, error, tag, });
    }

    return dispatch({ type: SELECT_CONTENT_SUCCESS, loading: false, tag, });
  };
}

