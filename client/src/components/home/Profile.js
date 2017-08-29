import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ profile = {}, }) => {
  return (
    <div className='profile'>
      <h2>
        <span className='icon'>
          <i className='fa fa-user' aria-hidden='true'></i>
        </span>
        {profile.title} </h2>
      <div dangerouslySetInnerHTML={{__html: profile.html,}} />
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
};

export default Profile;
