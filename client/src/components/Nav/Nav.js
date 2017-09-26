import React from 'react';
import PropTypes from 'prop-types';

import { ActiveNavItem, InactiveNavItem, } from './NavItem';

import './Nav.css';

class Nav extends React.Component {

  render() {

    const { links = [], location = {}, } = this.props;

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
                links.map((item, index) => {
                  const active = location.pathname === item.url;
                  return active ? <ActiveNavItem key={item.url} text={item.text} path={item.url} icon={item.icon} />
                                : <InactiveNavItem key={item.url} text={item.text} path={item.url} icon={item.icon} />;
                })
              }
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

Nav.propTypes = {
  links: PropTypes.array,
  location: PropTypes.object,
};

export default Nav;
