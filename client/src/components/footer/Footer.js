import React from 'react';
import PropTypes from 'prop-types';
import FooterSpotlights from './FooterSpotlights';
import Copyright from './Copyright';

import './Footer.css';

const Footer = ({ spotlights, copyright, }) => {
  return (
    <footer className='full-width'>
      <FooterSpotlights spotlights={spotlights} />
      <Copyright year={copyright.year} owner={copyright.owner} rights={copyright.rights} />
    </footer>
  );
};

Footer.propTypes = {
  spotlights: PropTypes.array,
  copyright: PropTypes.object,
};


export default Footer;

