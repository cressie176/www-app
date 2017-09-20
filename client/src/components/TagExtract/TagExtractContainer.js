import { connect, } from 'react-redux';

import { extractContent, } from '../../actions/contentActions';
import TagExtract from './TagExtract';

function mapStateToProps(state, props) {
  return {
    loading: state.content.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    extractContent: tag => {
      dispatch(extractContent(tag));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagExtract);
