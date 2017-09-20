import { connect, } from 'react-redux';
import { removeObfuscation, } from '../../actions/obfuscationActions';
import LinksSpotlight from './LinksSpotlight';

function mapStateToProps(state, props) {
  return {
    obfuscate: !!state.obfuscation[props.id],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeObfuscation: (id) => {
      dispatch(removeObfuscation(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinksSpotlight);
