import React from 'react';

import Spotlights from '../Spotlights';
import Copyright from '../Copyright';

import './Footer.css';

const Footer = () => {
  return (
    <footer className='full-width'>
      <Spotlights />
      <Copyright />
    </footer>
  );
};

export default Footer;

