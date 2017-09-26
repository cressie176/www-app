import { connect, } from 'react-redux';
import { fetchPage, } from '../../actions/pageActions';
import LegalPage from './LegalPage';

function mapStateToProps(state, props) {
  return {
    page: state.page.data,
    ...state.page.meta,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPage: id => {
      dispatch(fetchPage(id, { relative: true, }));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LegalPage);
