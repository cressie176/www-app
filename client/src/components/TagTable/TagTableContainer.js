import { connect, } from 'react-redux';
import { deleteContent, } from '../../actions/contentActions';
import TagTable from './TagTable';

function mapStateToProps(state, props) {
  return {
    loading: state.content.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteContent: tag => {
      dispatch(deleteContent(tag));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagTable);
