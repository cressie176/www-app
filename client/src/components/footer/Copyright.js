import React from 'react';
import PropTypes from 'prop-types';

const Copyright = ({year, owner, rights,}) => (
  <div className='container'>
    <div className='row'>
      <div className='col-md-12'>
        <span className='text'><span className='text-nowrap'>&copy; {year} {owner}.</span> <span className='text-nowrap'>{rights}</span></span>
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
