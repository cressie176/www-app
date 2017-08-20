import React from 'react';
import PropTypes from 'prop-types';

import PageIntro from '../common/PageIntro';

import './LegalPage.css';

const LegalPage = ({ title, html, type, }) => (
  <div className={`page legal-page legal-page--{type}`}>

    <PageIntro title={title} />

    <div className='row'>
      <div className='col-sm-offset-1 col-sm-8'>
        <div className='blurb' dangerouslySetInnerHTML={{__html: html,}} />
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
