import { connect, } from 'react-redux';
import { typeKey, finishTyping, } from '../../actions/errorActions';
import ErrorPage from './ErrorPage';

function mapStateToProps(state, props) {
  return {
    fullMessage: state.error.fullMessage,
    message: state.error.message,
    finishedTyping: state.error.finishedTyping,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    typeKey: (key) => {
      dispatch(typeKey(key));
    },
    finishTyping: () => {
      dispatch(finishTyping());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
