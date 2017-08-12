import React from 'react';
import PropTypes from 'prop-types';

const Copyright = ({year, owner, rights,}) => (
  <div className='container'>
    <div className='row'>
      <div className='col-md-12'>
        <span className='text'>&copy; {year} {owner}. {rights}</span>
      </div>
    </div>
  </div>
);

Copyright.propTypes = {
  year: PropTypes.string,
  owner: PropTypes.string,
  rights: PropTypes.string,
};

export default Copyright;
