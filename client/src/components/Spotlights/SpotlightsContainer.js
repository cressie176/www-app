import { connect, } from 'react-redux';

import Spotlights from './Spotlights';

function mapStateToProps(state, props) {
  return {
    spotlights: state.site.data.spotlights,
  };
}

export default connect(mapStateToProps)(Spotlights);
