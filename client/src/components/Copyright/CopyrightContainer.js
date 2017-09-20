import { connect, } from 'react-redux';
import Copyright from './Copyright';

function mapStateToProps(state, props) {
  return {
    ...state.site.copyright,
  };
}

export default connect(mapStateToProps)(Copyright);

