import { connect, } from 'react-redux';

import { previewContent, selectContent, } from '../../actions/contentActions';
import TagPicker from './TagPicker';

function mapStateToProps(state, props) {
  return {
    loading: state.content.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    previewContent: tag => {
      dispatch(previewContent(tag));
    },
    selectContent: tag => {
      dispatch(selectContent(tag));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagPicker);
