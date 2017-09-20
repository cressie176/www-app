import { connect, } from 'react-redux';

import Spotlights from './Spotlights';

function mapStateToProps(state, props) {
  return {
    ...state.site,
  };
}

export default connect(mapStateToProps)(Spotlights);
