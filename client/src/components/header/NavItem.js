import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, } from 'react-router-dom';

export const ActiveNavItem = ({path, text, icon,}) => (
  <li className='active'>
    <NavLink to={path}>
      <span className='icon'>
        <i className={`fa ${icon}`} aria-hidden='true'></i>
      </span>
      {text} <span className="sr-only">(current)</span>
    </NavLink>
  </li>
);

ActiveNavItem.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
};

export const InactiveNavItem = ({path, text, icon,}) => (
  <li>
    <NavLink to={path}>
      <span className='icon'>
        <i className={`fa ${icon}`} aria-hidden='true'></i>
      </span>
      {text}
    </NavLink>
  </li>
);

InactiveNavItem.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
};

