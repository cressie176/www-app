import { connect, } from 'react-redux';
import { fetchPage, } from '../../actions/pageActions';
import HomePage from './HomePage';

function mapStateToProps(state, props) {
  return {
    page: state.page,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPage: id => {
      dispatch(fetchPage(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
