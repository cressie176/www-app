import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';

const Header = ({ navigation }) => {
  return (
    <header>
      <Nav items={navigation.items} />
    </header>
  )
}

Header.propTypes = {
  navigation: PropTypes.object,
};

export default Header
