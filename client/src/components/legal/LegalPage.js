import React from 'react';
import PropTypes from 'prop-types';

import './LegalPage.css';

const LegalPage = ({ title, html, type, }) => (
  <div className={`legal-page legal-page--{type}`}>
    <div className='container-fluid legal-page__title__wrapper'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h2 className={`legal-page__title legal-page__title--${type}`}>{title}</h2>
          </div>
        </div>
      </div>
    </div>

    <div className='container'>
      <div className='row'>
        <div className='col-md-8'>
          <div className={`legal-page__content legal__content--${type}`} dangerouslySetInnerHTML={{__html: html,}} />
        </div>
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
