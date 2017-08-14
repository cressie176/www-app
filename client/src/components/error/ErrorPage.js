import React from 'react';
import PropTypes from 'prop-types';

import './ErrorPage.css';

const ErrorPage = ({ title, html, type, }) => (
  <div className={`error-page error-page--{type}`}>
    <div className='container-fluid error-page__title__wrapper'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h2 className={`error-page__title error-page__title--${type}`}>{title}</h2>
          </div>
        </div>
      </div>
    </div>
    <div className='container-fluid'>
      <div className='row'>
        <img className='error-page__hero' alt='error' src='/images/error.jpg' />
      </div>
    </div> </div>
);

ErrorPage.propTypes = {
  title: PropTypes.string,
  html: PropTypes.string,
  type: PropTypes.string,
};

export default ErrorPage;
