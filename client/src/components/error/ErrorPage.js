import React from 'react';
import PropTypes from 'prop-types';

import PageIntro from '../common/PageIntro';
import { connect, } from 'react-redux';

import { typeKey, finishTyping, } from '../../actions/errorActions';

import './ErrorPage.css';

export class ErrorPage extends React.Component {
  componentWillMount() {
    const scheduleNextKeyPress = () => {
      return delay(() => {
        if (this.props.message.length < this.props.fullMessage.length) {
          this.props.typeKey(this.props.fullMessage[this.props.message.length]);
          this.timeout = scheduleNextKeyPress();
        } else {
          this.props.finishTyping();
          clearTimeout(this.timeout);
        }
      });
    };

    this.timeout = scheduleNextKeyPress();

  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render() {
    return (
      <div className={`page error-page error-page--{this.props.type}`}>
        <PageIntro icon='fa-exclamation-triangle' title={this.props.title} />
        <div className='message__wrapper full-width gutter'>
          <div className='row'>
              <div className='col-md-offset-1 col-md-10'>
                <div className='message'>
                    <div className='message__text'>&gt; {this.props.message}</div>
                    { this.props.finishedTyping && <div className='message__cursor'>▋</div> }
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

ErrorPage.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  message: PropTypes.string,
  fullMessage: PropTypes.string,
  finishedTyping: PropTypes.bool,
};

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

function delay(fn) {
  return setTimeout(fn, 80 + Math.random() * 50);
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
