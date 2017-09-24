import React from 'react';
import PropTypes from 'prop-types';

import PageIntro from '../PageIntro';

import './ErrorPage.css';

class ErrorPage extends React.Component {

  componentWillMount() {
    const scheduleNextKeyPress = () => {

      const { message, fullMessage, typeKey, finishTyping, } = this.props;

      return delay(() => {
        if (message.length < fullMessage.length) {
          typeKey(fullMessage[message.length]);
          this.timeout = scheduleNextKeyPress();
        } else {
          finishTyping();
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

    const { title, message, finishedTyping, } = this.props;

    return (
      <div className='page error-page'>
        <PageIntro icon='fa-exclamation-triangle' title={title} />
        <div className='message__wrapper full-width gutter'>
          <div className='row'>
              <div className='col-md-offset-1 col-md-10'>
                <div className='message'>
                  <div className='message__text'>&gt; {message}</div>
                  {
                    finishedTyping
                      ? <div className='message__cursor'>▋</div>
                      : null
                  }
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

ErrorPage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  fullMessage: PropTypes.string.isRequired,
  finishedTyping: PropTypes.bool,
};

function delay(fn) {
  return setTimeout(fn, 80 + Math.random() * 50);
}

export default ErrorPage;
