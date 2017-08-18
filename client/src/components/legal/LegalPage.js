import React from 'react';
import PropTypes from 'prop-types';

import './LegalPage.css';

const LegalPage = ({ title, html, type, }) => (
  <div className={`legal-page legal-page--{type}`}>
    <div className='legal-page__title__wrapper full-width gutter'>
      <div className='row'>
        <div className='col-sm-offset-1 col-sm-11'>
          <h1 className={`legal-page__title legal-page__title--${type}`}>{title}</h1>
        </div>
      </div>
    </div>
    <div className='row'>
      <div className='col-sm-offset-1 col-sm-8'>
        <div className={`legal-page__content legal__content--${type}`} dangerouslySetInnerHTML={{__html: html,}} />
      </div>
    </div>
  </div>
);

LegalPage.propTypes = {
  title: PropTypes.string,
  html: PropTypes.string,
  type: PropTypes.string,
};

export default LegalPage;
