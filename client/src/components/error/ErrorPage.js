import React from 'react';
import PropTypes from 'prop-types';

import './ErrorPage.css';
import ErrorImg from './error.jpg';

const ErrorPage = ({ title, html, type, }) => (
  <div className={`error-page error-page--{type}`}>
    <div className='error-page__title__wrapper full-width gutter'>
      <div className='row'>
        <div className='col-sm-offset-1 col-sm-11'>
          <h2 className={`error-page__title error-page__title--${type}`}>{title}</h2>
        </div>
      </div>
    </div>
    <div className='row'>
      <img className='error-page__hero' alt='error' src={ErrorImg} />
    </div>
  </div>
);

ErrorPage.propTypes = {
  title: PropTypes.string,
  html: PropTypes.string,
  type: PropTypes.string,
};

export default ErrorPage;
