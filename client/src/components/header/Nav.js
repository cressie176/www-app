import React from 'react';
import PropTypes from 'prop-types';
import { ActiveNavItem, InactiveNavItem, } from './NavItem';

import './Nav.css';

const Nav = ({ items, }) => {
  return (
    <div className='row'>
      <nav className='navbar navbar-default navbar-overrides'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar-collapse' aria-expanded='false'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
        </div>
        <div className='collapse navbar-collapse' id='navbar-collapse'>
          <ul className='nav navbar-nav'>
            {
              items.map((item) => {
                const active = window.location.pathname === item.path;
                return active ? <ActiveNavItem key={item.path} text={item.text} path={item.path} />
                              : <InactiveNavItem key={item.path} text={item.text} path={item.path} />;
              })
            }
          </ul>
        </div>
      </nav>
    </div>
  );
};

Nav.propTypes = {
  items: PropTypes.array,
};


export default Nav;
