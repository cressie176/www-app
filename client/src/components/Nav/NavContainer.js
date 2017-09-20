import { connect, } from 'react-redux';
import { withRouter, } from 'react-router';
import Nav from './Nav';

function mapStateToProps(state, props) {
  return {
    ...state.site.navigation,
  };
}

export default withRouter(connect(mapStateToProps)(Nav));
