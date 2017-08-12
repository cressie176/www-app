import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ title, summary, }) => {
  return (
    <div className='profile'>
      <h2>
        <span className='icon'>
          <i className='fa fa-user' aria-hidden='true'></i>
        </span>
        {title} </h2>
      <div dangerouslySetInnerHTML={{__html: summary,}} />
    </div>
  );
};

Profile.propTypes = {
  title: PropTypes.string,
  summary: PropTypes.string,
};

export default Profile;
