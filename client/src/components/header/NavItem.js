import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, } from 'react-router-dom';

export const ActiveNavItem = ({path, text,}) => (
  <li className='active'>
    <NavLink to={path}>{text} <span className="sr-only">(current)</span></NavLink>
  </li>
);

ActiveNavItem.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string,
};

export const InactiveNavItem = ({path, text,}) => (
  <li>
    <NavLink to={path}>{text}</NavLink>
  </li>
);

InactiveNavItem.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string,
};

