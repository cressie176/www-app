import { connect, } from 'react-redux';
import FooterSpotlights from './FooterSpotlights';

function mapStateToProps(state, props) {
  return {
    ...state.site,
  };
}

export default connect(mapStateToProps)(FooterSpotlights);
