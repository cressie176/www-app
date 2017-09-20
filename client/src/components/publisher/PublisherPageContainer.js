import { connect, } from 'react-redux';
import { fetchTags, fetchReferences, } from '../../actions/contentActions';
import naturally from 'string-natural-compare';
import PublisherPage from './PublisherPage';

function mapStateToProps(state, props) {
  const references = state.content.references;

  const tags = state.content.tags.map(id => {
    return { id, referencedBy: [], };
  }).map(tag => {
    Object.keys(references).forEach(id => {
      if (references[id].tag === tag.id) tag.referencedBy.push(id);
    });
    return tag;
  }).sort((a, b) => {
    return naturally(b.id, a.id);
  });

  const activeReference = Object.keys(references).map(id => references[id]).find(reference => reference.active) || {};

  return {
    references,
    tags,
    activeReference: activeReference,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchReferences: () => {
      dispatch(fetchReferences());
    },
    fetchTags: () => {
      dispatch(fetchTags());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublisherPage);
