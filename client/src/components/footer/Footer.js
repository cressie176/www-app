import React from 'react';
import PropTypes from 'prop-types';
import FooterSpotlights from './FooterSpotlights';
import Copyright from './Copyright';

import './Footer.css';

const Footer = ({ spotlights, copyright, }) => {
  return (
    <footer>
      <div className='container-fluid footer__spotlights'>
        <FooterSpotlights spotlights={spotlights} />
      </div>
      <div className='container-fluid footer__copyright'>
        <Copyright year={copyright.year} owner={copyright.owner} rights={copyright.rights} />
      </div>
    </footer>
  );
};

Footer.propTypes = {
  spotlights: PropTypes.array,
  copyright: PropTypes.object,
};


export default Footer;

