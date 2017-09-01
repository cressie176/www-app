import React from 'react';
import PropTypes from 'prop-types';
import { ActiveNavItem, InactiveNavItem, } from './NavItem';
import { connect, } from 'react-redux';
import { withRouter, } from 'react-router';


import './Nav.css';

export class Nav extends React.Component {
  render() {
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
                this.props.links && this.props.links.map((item, index) => {
                  const active = this.props.location.pathname === item.url;
                  return active ? <ActiveNavItem key={item.url} text={item.text} path={item.url} />
                                : <InactiveNavItem key={item.url} text={item.text} path={item.url} />;
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
};

function mapStateToProps(state, props) {
  return {
    ...state.site.navigation,
  };
}

export default withRouter(connect(mapStateToProps)(Nav));
