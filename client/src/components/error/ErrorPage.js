import React from 'react';
import PropTypes from 'prop-types';

import PageIntro from '../common/PageIntro';

import './ErrorPage.css';
import ErrorImg from './error.jpg';

const ErrorPage = ({ title, html, type, }) => (
  <div className={`page error-page error-page--{type}`}>
    <PageIntro title={title} />

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
